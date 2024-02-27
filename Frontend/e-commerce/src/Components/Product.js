import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { addCartItems } from "../Utils/cartSlice";

const Product = () => {
	const data = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((store) => store.cart.cartItems);

	const category = data?.category.toLowerCase();

	const product = useSelector((store) => store.items[category]);
	const token = useSelector((store) => store.user.token);

	useEffect(() => {
		if (!product) {
			navigate("/" + category + "/noProduct");
		}
	}, []);

	const item = product?.find((prod) => prod?._id === data?.id);

	function toBase64(arr) {
		//arr = new Uint8Array(arr) if it's an ArrayBuffer
		return btoa(
			arr?.reduce((data, byte) => data + String.fromCharCode(byte), "")
		);
	}
	// console.log(item);

	const handleAddToCart = async () => {
		const present = cart?.some(
			(itemInCart) =>
				JSON.stringify({ ...item, totalItems: 1 }) ===
				JSON.stringify(itemInCart)
		);
		if (present) {
			navigate("/cart");
			return;
		}
		// if (!present) dispatch(addCartItems({ ...item, totalItems: 1 }));

		//Send to Backend

		const msg = await fetch(`http://localhost:3000/customer/additem`, {
			method: "POST",
			body: JSON.stringify({
				_id: item._id,
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(msg);

		navigate("/cart");
	};

	return (
		<>
			<Header />
			<div className="pt-32 flex flex-col items-center">
				<img
					src={
						"data:" +
						item?.images[0]?.contentType +
						";base64," +
						toBase64(item?.images[0]?.data?.data)
					}
					alt="Product"
					className="w-72 mx-auto p-5 mt-10"
				/>
				<h1 className="font-bold text-3xl mt-10">{item?.productName}</h1>
				<div className="text-base">{item?.sellerName}</div>
				<div className="text-xl font-bold mt-5">₹{item?.price}</div>
				<Link to={"/" + item?.category}>
					<div className="hover:underline">{item?.category}</div>
				</Link>

				<div className="mt-10">
					<button
						onClick={handleAddToCart}
						className="font-semibold text-xl bg-green-600 text-white py-4 px-7 rounded-md hover:bg-green-400 duration-150"
					>
						ADD TO CART
					</button>
				</div>
			</div>
		</>
	);
};

export default Product;
