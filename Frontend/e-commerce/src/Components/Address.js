import React, { useRef } from "react"; // Import React
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../Utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import useProfile from "../Hooks/useProfile";
import PlaceOrder from "./PlaceOrder";
import { nanoid } from "@reduxjs/toolkit";

const Address = ({ addressPresent, handleRemoveAddress }) => {
	const cNo = useRef(null);
	const house = useRef(null);
	const street = useRef(null);
	const landmark = useRef(null);
	const city = useRef(null);

	useProfile();

	let cartItems = useSelector((store) => store.profile.profile);
	cartItems = cartItems?.cartItems;

	const navigate = useNavigate();

	const token = useSelector((store) => store.user.token);
	const cartID = useSelector((store) => store.user.cartID);

	const dispatch = useDispatch();

	const handleAddAddress = async () => {
		const address = {
			cartId: cartID,
			contact: cNo?.current?.value,
			house: house?.current?.value,
			street: street?.current?.value,
			landmark: landmark?.current?.value,
			city: city?.current?.value,
		};
		dispatch(addAddress(address));

		const data = await fetch("http://localhost:3000/customer/order", {
			method: "POST",
			body: JSON.stringify(address),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		console.log(data);

		if (data.ok) navigate("/order-success");
	};

	// const handlePlaceOrder = () => {
	// 	navigate("/order-success");
	// };

	console.log(addressPresent);
	// if (!cartItems) return <PlaceOrder />;
	return (
		<div className="pt-48">
			<form
				id="form"
				onSubmit={(e) => {
					e.preventDefault();
					handleAddAddress();
				}}
				className="bg-slate-400 w-1/2 mx-auto px-6 pb-7 rounded shadow-2xl"
			>
				<h1 className="text-xl font-bold py-5">
					{!addressPresent ? "Add Address" : "Your current Address"}
				</h1>

				<div>
					<h2 className="font-semibold">Contact Details</h2>

					{!addressPresent ? (
						<input
							className="w-full mt-2 p-2 outline-none"
							ref={cNo}
							placeholder="Contact Number"
							required
						/>
					) : (
						<div className="w-full mt-2 p-2 outline-none bg-white">
							{cartItems.contact}
						</div>
					)}
				</div>

				<div className="mt-4">
					<h2 className="font-semibold">Address Details</h2>
					{!addressPresent ? (
						<input
							className="w-full mt-2 p-2 outline-none"
							ref={house}
							placeholder="House / Flat no"
							required
						/>
					) : (
						<div className="w-full mt-2 p-2 outline-none bg-white">
							{cartItems.house}
						</div>
					)}
					{!addressPresent ? (
						<input
							className="w-full mt-2 p-2 outline-none"
							ref={street}
							placeholder="Street / Locality"
							required
						/>
					) : (
						<div className="w-full mt-2 p-2 outline-none bg-white">
							{cartItems.street}
						</div>
					)}
					{!addressPresent ? (
						<input
							className="w-full mt-2 p-2 outline-none"
							ref={landmark}
							placeholder="Landmark"
							required
						/>
					) : (
						<div className="w-full mt-2 p-2 outline-none bg-white">
							{cartItems.landmark}
						</div>
					)}
					{!addressPresent ? (
						<input
							className="w-full mt-2 p-2 outline-none"
							ref={city}
							placeholder="City"
							required
						/>
					) : (
						<div className="w-full mt-2 p-2 outline-none bg-white">
							{cartItems.city}
						</div>
					)}
				</div>

				{!addressPresent ? (
					<button
						type="submit"
						form="form"
						className="w-full mt-10 p-3 font-semibold bg-gray-200 hover:bg-green-400 hover:text-white duration-300"
					>
						Add Address
					</button>
				) : (
					<div className="mt-7 mx-auto w-full flex justify-center">
						<button
							onClick={(e) => {
								e.preventDefault();
								handleRemoveAddress();
							}}
							className="p-3 bg-slate-300 shadow-lg hover:scale-95 hover:duration-200 hover:text-white hover:bg-red-400"
						>
							Remove address
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								handleAddAddress();
							}}
							className="ml-10 p-3 bg-slate-300 shadow-lg hover:scale-95 hover:duration-200 hover:bg-green-400 "
						>
							Place Order with current address
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default Address;
