import express from "express";
import order from "../../models/order.js";
import { Auth } from "../../controllers/auth.js";
import customerCart from "../../models/cart.js";

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
			for (const product of cartDetails.product) {
				orderExists.orderValues.push({
					product: product.product,
					totalItems: product.totalItems,
					date: new Date(),
				});
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
