import express from "express";
import order from "../../models/order.js";
import { Auth } from "../../controllers/auth.js";
import customerCart from "../../models/cart.js";
import product from "../../models/product.js";

const router = express.Router();

router.post("/order", Auth, async (req, res) => {
	try {
		const { cartId, contact, house, street, landmark, city } = req.body;
		const cartDetails = await customerCart.findOne({ _id: cartId });
		console.log(cartDetails.product);
		// res.json(cartDetails)

		const orderExists = await order.findOne({ cartId: cartDetails._id });

		if (!orderExists) {
			await order.create({
				cartId: cartId,
				customer: cartDetails.customer,
				contact: contact,
				house: house,
				street: street,
				landmark: landmark,
				city: city,

				// orderValues:
				// [
				//     {
				//         product: cartDetails.product,
				//         date: new Date()
				//     }
				// ]
				orderValues: cartDetails.product.map((product) => ({
					product: product.product,
					totalItems: product.totalItems, // Assuming product is a reference to Product model
					date: new Date(),
				})),
			});
			// cartDetails.product.map(async (product)=> {
			// 	await product.findOneAndUpdate({product.product},{})
			// })
			console.log('cartProducts' , cartDetails)
			for(product of cartDetails.product){
				const proooo = await product.findByIdAndUpdate({_id: product.product}, {$inc:{totalItems: product.totalItems}})
				console.log(proooo)
			}
			
			

			await cartDetails.product.splice(0, cartDetails.product.length);
			await cartDetails.save();
			
			// console.log(order)
			res.json(order);
		} else {
			//                 const populatedOrder = await order.findById(orderExists._id).populate('orderValues.product').populate('customer')
			// res.json(populatedOrder)

			if (orderExists.street == null) {
				await order.findOneAndUpdate(
					{ cartId: cartDetails._id },
					{
						$set: {
							cartId: cartId,
							customer: cartDetails.customer,
							contact: contact,
							house: house,
							street: street,
							landmark: landmark,
							city: city,
						},
					}
				);
				console.log("Update address");
			}
			for (const prods of cartDetails.product) {
				orderExists.orderValues.push({
					product: prods.product,
					totalItems: prods.totalItems,
					date: new Date(),
					
				}
				)
				await product.findOneAndUpdate(prods.product, { $inc: { totalItems: prods.totalItems } })
			}
			await orderExists.save();

			await cartDetails.product.splice(0, cartDetails.product.length);
			await cartDetails.save();
			res.json("Done");
		}
	} catch (err) {
		console.log(err);
		res.json("INternal server error");
	}
});

export default router;
