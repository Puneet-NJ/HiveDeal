import React from "react";
import Header from "./Header";
import CategoryList from "./CategoryList";
import useFetchProducts from "../Hooks/useFetchProducts";
import { useSelector } from "react-redux";

const Browse = () => {
	useFetchProducts();

	const products = useSelector((store) => store.items);

	if (!products) return null;

	const { mobiles, clothes, bags, snacks, laptops } = products;

	// console.log(products);

	return (
		<div className="">
			<Header />
			<div className="pt-40">
				<CategoryList category={mobiles} categoryPage={false} />
			</div>
			<CategoryList category={clothes} categoryPage={false} />
			<CategoryList category={bags} categoryPage={false} />
			<CategoryList category={snacks} categoryPage={false} />
			<CategoryList category={laptops} categoryPage={false} />
		</div>
	);
};

export default Browse;
