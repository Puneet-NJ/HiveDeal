import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: true
    },
    adminPass: {
        type: String,
        required: true
    }
})

const admin = mongoose.model("Admin", adminSchema);
export default admin;