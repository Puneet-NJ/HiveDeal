import express from "express";
import jwt from "jsonwebtoken";
import { Auth } from "../../controllers/auth.js";
import product from "../../models/product.js";
import order from "../../models/order.js";
import customer from "../../models/customer.js";

const router = express.Router();
router.get("/home", Auth, (req, res) => {
	try {
		jwt.verify(req.token, process.env.token, async (err, data) => {
			const maxOrdered = await product.find().sort({ totalItems: -1 }).limit(1);
			const minOrdered = await product.find().sort({ totalItems: +1 }).limit(1);

			// const productItems = await product.find()
			// console.log(productItems)
			// const revenue = productItems.reduce((acc, product) => {
			//     return  (product.totalItems * product.price);
			//   }, 0);

			// console.log(revenue)

			const revenue = await product.aggregate([
				{
					$project: {
						totalPrice: {
							$multiply: ["$price", "$totalItems"],
						},
					},
				},
				{
					$group: {
						_id: null,
						total: { $sum: "$totalPrice" },
					},
				},
			]);

			const totalUsers = await customer.find().countDocuments();
			// console.log(totalUsers)
			const cutomersList = await customer.find();
			// console.log(totalUsers)
			res.json({ maxOrdered, minOrdered, revenue, totalUsers, cutomersList });
		});
	} catch (error) {}
});
router.post("/removeproduct", Auth, (req, res) => {
	try {
		jwt.verify(req.token, process.env.token, async (err, data) => {
			const { productId } = req.body;
			try {
				await product.deleteOne({ _id: productId });
				res.json("deleted");
			} catch (error) {
				console.log(error);
			}
		});
	} catch (err) {
		console.err(err);
	}
});
export default router;
