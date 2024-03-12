import express from "express";
import order from "../../models/order.js";
import { Auth } from "../../controllers/auth.js";
import jwt from "jsonwebtoken";
import customer from "../../models/customer.js";

const router = express.Router();

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

router.post("/removeAddress", Auth, async (req, res) => {
	try {
		jwt.verify(req.token, process.env.user_token, async (err, data) => {
			if (err) {
				//If error send Forbidden (403)
				console.log("ERROR: Could not connect to the protected route", err);
				res.sendStatus(403);
			} else {
				const customerValue = await customer.findOne({
					customerEmail: data.customerEmail,
				});
				const removedAddress = await order.findOneAndUpdate(
					{ customer: customerValue._id },
					{
						contact: null,
						house: null,
						landmark: null,
						street: null,
						city: null,
					}
				);
				if (removedAddress) {
					return res.json("Address removed");
				} else {
					return res.json("Got some error");
				}
			}
		});
	} catch (error) {
		res.json(error);
	}
});

export default router;
