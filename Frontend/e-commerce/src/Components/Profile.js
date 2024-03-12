import React, { useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import useProfile from "../Hooks/useProfile";
import ShowOrders from "./ShowOrders";

const Profile = () => {
	const [showAddress, setShowAddress] = useState(true);

	useProfile();

	let cartItems = useSelector((store) => store.profile.profile);
	cartItems = cartItems?.cartItems;
	console.log(cartItems);

	// if (!cartItems) return;
	return (
		<div>
			<Header />
			{cartItems ? (
				<div className="w-[80%] mx-auto pt-40 leading-7">
					<div>
						<div className="">Name: {cartItems.customer.customerName}</div>
						<div className="">Email: {cartItems.customer.customerEmail}</div>
					</div>

					<div>
						<div className="my-12">
							<button
								onClick={() => {
									setShowAddress((prev) => !prev);
								}}
								className="p-5 bg-slate-400 rounded-t-md shadow-2xl w-full"
							>
								Your Address⬇️
							</button>
							{showAddress && (
								<div className="bg-slate-200 rounded-b-md w-full px-10 py-5 leading-8">
									<div>Contact: {cartItems.contact}</div>
									<div>House: {cartItems.house}</div>
									<div>Street: {cartItems.street}</div>
									<div>Landmark: {cartItems.landmark}</div>
									<div>City: {cartItems.city}</div>
								</div>
							)}
						</div>

						<div>
							<ShowOrders orderValues={cartItems.orderValues} />
						</div>
					</div>
				</div>
			) : (
				<div className="pt-60 text-4xl text-red-600 text-center">
					{" "}
					No order history😕
				</div>
			)}
		</div>
	);
};

export default Profile;
