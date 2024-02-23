import mongoose from 'mongoose';

const customerCartSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference the 'Product' model here
            required: true
        }
    ],
    quantity: {
        type: Number,
        // Additional options if needed
    }
});

const customerCart = mongoose.model('customerCart', customerCartSchema);
export default customerCart;
