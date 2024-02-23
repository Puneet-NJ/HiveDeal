import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
	customerName: { type: String, required: true },
	customerEmail: String,
	customerPassword: String,
});

const customer = mongoose.model("customer", customerSchema);
export default customer;
