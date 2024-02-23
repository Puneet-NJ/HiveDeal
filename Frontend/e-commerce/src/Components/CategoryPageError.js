import React from "react";
import Header from "./Header";

const CategoryPageError = () => {
	return (
		<div>
			<Header />
			<div className="font-semibold text-4xl text-red-600 pt-40 text-center">
				--404-- Page Not Found
			</div>
		</div>
	);
};

export default CategoryPageError;
