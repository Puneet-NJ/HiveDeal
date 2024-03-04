import { Auth } from "../../controllers/auth.js";
import customerCart from "../../models/cart.js";
import customer from "../../models/customer.js";
import express from "express";
import jwt from "jsonwebtoken";
import product from "../../models/product.js";

// import product from '../models/product'

const router = express.Router();

router.get("/cart", Auth, async (req, res) => {
	try {
		jwt.verify(req.token, process.env.user_token, async (err, data) => {
			if (err) {
				return res.status(403).json("error, forbidden");
			}
			
			const custCartValue = await customer.findOne({
				customerEmail: data.customerEmail,
			});

			// console.log(custID)
			const cartItems = await customerCart
				.findOne({ customer: custCartValue._id })
				.populate("customer")
				.populate({
					path: "product.product",
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

router.post("/additem", Auth, async (req, res) => {
	const { _id, isInc } = req.body;

	//To increase number of items in cart
	if (isInc) {
		try {
			jwt.verify(req.token, process.env.user_token, async (err, data) => {
				if (err) {
					return res.json("error, forbidden");
				}

				const custCartValue = await customer.findOne({
					customerEmail: data.customerEmail,
				});

				let cart = await customerCart.findOne({ customer: custCartValue._id });
				if (!cart) {
					await customerCart.create({
						customer: custCartValue._id,
						product: [{ product: _id }],
					});
				} else {
					const productInCart = cart.product.find(
						(p) => p.product.toString() === _id
					);

					if (productInCart) {
						productInCart.totalItems += 1;
					} else {
						cart.product.push({ product: _id });
					}
					await cart.save();
				}

				await product.findByIdAndUpdate(_id, { $inc: { totalItems: 1 } });

				return res.send("Item added to cart");
			});
		} catch (err) {
			return res.json("Internal server error");
		}
	}

	//To remove Number of items
	else {
		try {
			const { _id } = req.body;

			jwt.verify(req.token, process.env.user_token, async (err, data) => {
				if (err) {
					return res.json("error, forbidden");
				}

				const custCartValue = await customer.findOne({
					customerEmail: data.customerEmail,
				});

				let cart = await customerCart.findOne({ customer: custCartValue._id });
				if (!cart) {
					await customerCart.create({
						customer: custCartValue._id,
						product: [{ product: _id }],
					});
				} else {
					const productInCart = cart.product.find(
						(p) => p.product.toString() === _id
					);

					if (productInCart) {
						if (productInCart.totalItems > 1) {
							productInCart.totalItems -= 1;
						} else {
							return res.json("cannot further decrease");
						}
					} else {
						cart.product.push({ product: _id });
					}
					await cart.save();
				}

				await product.findByIdAndUpdate(_id, { $dec: { totalItems: 1 } });

				return res.send("Item Decreased");
			});
		} catch (err) {
			return res.json("Internal server error");
		}
	}
});

router.post("/removeitem", Auth, async (req, res) => {
	try {
		const { _id } = req.body;
		jwt.verify(req.token, process.env.user_token, async (err, data) => {
			if (err) {
				res.json("forbidden");
			} else {
				const cust = await customer.findOne({
					customerEmail: data.customerEmail,
				});
				const customerCartValues = await customerCart.findOne({
					customer: cust._id,
				});
				
				const procuctToRemove = customerCartValues.product.filter((item) => {
					return item.product.toString() !== _id;
				});
				// console.log('product removed ' , procuctToRemove)
				customerCartValues.product = procuctToRemove;
				await customerCartValues.save();
				//    console.log(customerCartValues)
				// console.log(customerCartValues)
				res.json("Item removed Succesfully");
			}
		});
	} catch (err) {
		res.json(" Internal Server Error ", err);
	}
});

// router.post('/decrement', Auth , (req,res)=>{

// })

export default router;