import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import customer from "../../models/customer.js";

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { customerName, customerEmail, customerPhone, customerPassword } =
			req.body;

		const existingUser = await customer.findOne({ customerEmail });
		if (existingUser) {
			return res.json({ message: "User already exists" });
		}

		const hashPassword = await bcrypt.hash(customerPassword, 10);

		const newUser = await customer.create({
			customerName,
			customerEmail,
			customerPhone,
			customerPassword: hashPassword,
		});

		const token = jwt.sign({ customerEmail }, process.env.user_token, {
			expiresIn: "1h",
		});

		// req.session.userID = newUser._id;
		// console.log(req.session.userID);

		return res.json({
			auth: true,
			token: token,
			message: "New user registered successfully",
		});
	} catch (err) {
		console.error(err);
		return res.json({ message: "Internal server error" });
	}
});

router.post("/login", async (req, res) => {
	const { customerEmail, customerPassword } = req.body;
	try {
		const customerData = await customer.findOne({ customerEmail });
		if (!customerData) {
			return res.json({
				admin: false,
				auth: false,
				message: "Customer not found",
			});
		}
		const validCustomer = await bcrypt.compare(
			customerPassword,
			customerData.customerPassword
		);
		if (validCustomer) {
			const token = jwt.sign({ customerEmail }, process.env.user_token, {
				expiresIn: "1h",
			});
			res.cookie("token", token, { httpOnly: true });
			// req.session.userID = customerData._id;
			// console.log(req.userID);
			const valid = {
				admin: false,
				auth: true,
				token: token,
			};
			console.log(valid);
			res.json(valid);
		} else {
			res.json({ message: "Invalid credentials" });
		}
	} catch (error) {
		console.log(error);
	}
});

export default router;