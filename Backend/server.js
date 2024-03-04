import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Session from "express-session";
import passport from "passport";
import cors from "cors";
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser())
app.use(
	express.urlencoded({
		extended: true,
	})
);

import { db } from "./config/db.js";
import { initializingPassport } from "./config/passportConfig.js";
import customerRegister from "./routes/customer/customer.js";
import customerLogin from "./routes/customer/customerLogin.js";
// import productRoutes from "./routes/product.js";
import productList from "./routes/getproducts.js";
import adminRoutes from "./routes/admin/admin.js";
import customerCart from "./routes/customer/customerCart.js";
import order from './routes/customer/order.js'
import customerProfile from './routes/customer/customerProfile.js'
// import { isAuth } from "./controllers/auth.js";

db(); 
initializingPassport(passport);
app.use(
	Session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, 
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static("uploads"));

//routes
app.use("/customer", customerRegister, customerCart, order , customerProfile);
// app.use("/login", customerLogin);
// app.use("/addproduct", productRoutes);
app.use("/getproducts", productList);
app.use("/admin", adminRoutes);
// app.use('/adminHome', adminHome)

app.get("/", (req, res) => {
	res.json({ auth: true });
});
app.post("/logout", (req, res) => {
	req.logout((err) => {
		res.json("logged out");
	});
});
app.listen(3000, async () => {
	console.log("server listening");
});
