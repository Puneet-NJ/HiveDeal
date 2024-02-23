import { Auth } from "../controllers/auth.js";
import customerCart from "../models/cart.js";
import customer from "../models/customer.js";
import express from "express";
import jwt from "jsonwebtoken";
import product from "../models/product.js";

// import product from '../models/product'

const router = express.Router();

router.get("/cart", Auth, async (req, res) => {
	try {
		jwt.verify(req.token, process.env.user_token, async (err, data) => {
			if (err) {
				return res.status(403).json("error, forbidden");
			}
			console.log("data", data.customerEmail);
			const custCartValue = await customer.findOne({
				customerEmail: data.customerEmail,
			});

			// console.log(custID);
			const cartItems = await customerCart
				.findOne({ customer: custCartValue._id })
				.populate("customer")
				.populate("product");
			console.log(cartItems);
			res.json({
				cartItems,
			});
		});
	} catch (err) {
		console.log(err);
	}
});

router.post("/additem", Auth, async (req, res) => {
	try {
		const { _id } = req.body;

		// Check if the customer ID is available in the session
		// if (!req.session.userID) {
		// 	return res.status(403).json("Forbidden, Please Login first");
		// }

		// const custID = req.session.userID;
		const productId = _id;

		// console.log(custID);
		// Verify the JWT token
		jwt.verify(req.token, process.env.user_token, async (err, data) => {
			// console.log("data", data.customerEmail);
			const custCartValue = await customer.findOne({
				customerEmail: data.customerEmail,
			});
			console.log(custCartValue);
			if (err) {
				return res.status(403).json("error, forbidden");
			} else {
				let cart = await customerCart.findOne({ customer: custCartValue._id });
				console.log(cart);
				if (!cart) {
					await customerCart.create({
						customer: custCartValue._id,
						product: productId,
					});
					await product.findOneAndUpdate({ _id: productId }, { totalItems: 1 });
					return res.json("New cart created for new user");
				} else {
					await customerCart.findOneAndUpdate(
						{ customer: custCartValue._id },
						{ $push: { product: productId } }
					);
					await product.findOneAndUpdate({ _id: productId }, { totalItems: 1 });
					return res.send("New item added");
				}
			}
		});
	} catch (err) {
		return res.status(500).json("Internal server error");
	}
});

// router.post('/item/quantity/:id' , Auth , async(req,res)=>{
//     const {productId , quantity} = req.body
//     try{

//     }
//     catch(err){
//         res.json('internal server error')
//     }
// })

export default router;
