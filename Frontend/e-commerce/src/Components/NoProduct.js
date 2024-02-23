import React from "react";
import Header from "./Header";

const NoProduct = () => {
	return (
		<div>
			<Header />
			<div className="font-semibold text-2xl text-red-600 pt-40 text-center">
				No Product by this ID😕
			</div>
		</div>
	);
};

export default NoProduct;
