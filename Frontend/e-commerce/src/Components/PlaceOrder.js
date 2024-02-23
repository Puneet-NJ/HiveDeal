import React from "react";
import Header from "./Header";
import Address from "./Address";
import { useSelector } from "react-redux";
import Payment from "./Payment";

const PlaceOrder = () => {
	const address = useSelector((store) => store.user.address);

	// console.log(address);
	return (
		<div>
			{/* I Know its not in login form but it gives a header with only logo */}
			<Header ifInLogin={true} />

			{!address ? <Address /> : <Payment />}
		</div>
	);
};

export default PlaceOrder;
