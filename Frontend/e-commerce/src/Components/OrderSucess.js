import React from "react";
import Header from "./Header";

const OrderSucess = () => {
	return (
		<div>
			<Header ifInLogin={true} />
			<div className="pt-96 text-5xl h-screen transition-opacity text-black text-center">
				Order Success 🥳
			</div>
		</div>
	);
};

export default OrderSucess;
