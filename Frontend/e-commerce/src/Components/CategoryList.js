import React from "react";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";

const CategoryList = ({ category, categoryPage }) => {
	if (!category) return null;

	function toBase64(arr) {
		//arr = new Uint8Array(arr) if it's an ArrayBuffer
		return btoa(
			arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
		);
	}

	return (
		<div className={"mb-5 px-10 " + (categoryPage ? "w-[80%] mx-auto" : "")}>
			{categoryPage ? (
				<h1 className="text-2xl py-3 inline-block px-2">
					{category[0]?.category}
				</h1>
			) : (
				<Link to={"/" + category[0]?.category}>
					<h1 className="text-2xl py-3 inline-block px-2 hover:underline hover:scale-95 duration-150">
						{category[0]?.category}
					</h1>
				</Link>
			)}
			<div
				className={
					"flex " +
					(categoryPage
						? "flex-wrap justify-center"
						: "overflow-x-scroll no-scrollbar")
				}
			>
				{category.map(
					(prod) =>
						prod?.category && (
							<ProductList
								key={prod?._id}
								id={prod?._id}
								productName={prod?.productName}
								category={prod?.category}
								price={prod?.price}
								categoryPage={categoryPage}
								img={
									"data:" +
									prod?.images[0]?.contentType +
									";base64," +
									toBase64(prod?.images[0]?.data?.data)
								}
							/>
							// </Link>
						)
				)}
			</div>
		</div>
	);
};

export default CategoryList;
