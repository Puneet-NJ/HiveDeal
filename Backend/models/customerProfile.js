import mongoose from "mongoose";

const customerProfileSchema = mongoose.Schema({
	customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    orderDetails: {
        ref: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }
});

const customerProfile = mongoose.model("customerProfile", customerProfileSchema);
export default customerProfile;
