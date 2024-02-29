import express from 'express'
import order from "../models/order.js" 
import { Auth } from '../controllers/auth.js' 
import jwt from 'jsonwebtoken'
import customer from '../models/customer.js'

const router = express.Router()

router.get("/profile", Auth, async (req, res) => {
	try {
		jwt.verify(req.token, process.env.user_token, async (err, data) => {
			if (err) {
				return res.status(403).json("error, forbidden");
			}
			
			const custCartValue = await customer.findOne({
				customerEmail: data.customerEmail,
			});

			// console.log(custID)
			const cartItems = await order
				.findOne({ customer: custCartValue._id })
				.populate("customer")
				.populate({
					path: "orderValues.product",
					model: "Product",
				});


			res.json({
				cartItems,
			});
		});
	} catch (err) {
		console.log(err);
	}
});


export default router