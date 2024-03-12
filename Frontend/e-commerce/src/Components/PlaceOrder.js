import React, { useEffect, useState } from "react";
import Header from "./Header";
import Address from "./Address";
import { useSelector } from "react-redux";
import RemoveAddress from "./RemoveAddress";
import useProfile from "../Hooks/useProfile";

const PlaceOrder = () => {
	const [addressPresent, setAddressPresent] = useState(true);

	useProfile();

	const token = useSelector((store) => store.user.token);
	let cartItems = useSelector((store) => store.profile.profile);
	cartItems = cartItems?.cartItems;

	useEffect(() => {
		if (!cartItems?.city) {
			setAddressPresent(false);
		}
	}, [cartItems]); // Run the effect only when cartItems changes

	const handleRemoveAddress = async () => {
		const data = await fetch("http://localhost:3000/customer/removeAddress", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		console.log(data);
		setAddressPresent(false);
	};

	console.log(cartItems);
	console.log(addressPresent);

	return (
		<div>
			{/* I Know its not in login form but it gives a header with only logo */}
			<Header ifInLogin={true} />

			<Address
				addressPresent={addressPresent}
				handleRemoveAddress={handleRemoveAddress}
			/>
			{/* {!cartItems ? <Address /> : <RemoveAddress />} */}
		</div>
	);
};

export default PlaceOrder;
