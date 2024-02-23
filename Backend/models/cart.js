import mongoose from 'mongoose';


const productQuantity = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference the 'Product' model here
        required: true
    },
    totalItems: {
        type: Number,
        default: 1
    }
});


const customerCartSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
   product: [productQuantity]
    // totalItems: {
    //     type: Number,
    //     // Additional options if needed
    // }
});

const customerCart = mongoose.model('customerCart', customerCartSchema);
export default customerCart;
