import React from "react";
import { Link } from "react-router-dom";

const ProductList = (props) => {
	const { productName, category, price, img, categoryPage, id } = props;

	return (
		<div className="mr-4 mb-10 hover:scale-95 hover:border border-gray-400 duration-150">
			<Link to={"/" + category + "/" + id}>
				<div className="min-w-[320px] max-w-[320px] h-[428px] p-5 border flex flex-col justify-center text-center shadow-xl">
					<img
						className="max-w-[80%] h-[60%] mx-auto"
						src={img}
						alt="Product"
					/>
					<h1 className="mt-10 font-bold text-lg">{productName}</h1>
					<h2 className="text-sm">₹{price}</h2>
				</div>
			</Link>
		</div>
	);
};

export default ProductList;
