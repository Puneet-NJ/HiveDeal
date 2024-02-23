import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import CategoryList from "./CategoryList";

const CategoryPage = () => {
	let categoryName = useParams();
	categoryName = categoryName?.category?.toLowerCase();

	const [filteredCat, setFilteredCat] = useState(null);
	const navigate = useNavigate();

	const category = useSelector((store) => store.items[categoryName]);

	useEffect(() => {
		if (!category) {
			navigate("/gibberish");
		}
	}, []);

	useEffect(() => {
		setFilteredCat(category);
	}, [category]);

	if (!category) return null;

	const handlePrice = (lth) => {
		const arr = filteredCat.map((item) => ({ ...item }));

		if (lth) {
			arr.sort((a, b) => a.price - b.price);
			setFilteredCat(arr);
		} else {
			arr.sort((a, b) => b.price - a.price);
			setFilteredCat(arr);
		}
	};

	return (
		<div>
			<Header />
			<div className="pt-40">
				<div className="mx-auto relative top-1 flex justify-center">
					<button
						onClick={() => {
							handlePrice(true);
						}}
						className="bg-black text-white rounded-md mr-4 hover:bg-gray-700 hover:scale-95 duration-150 px-7 py-2"
					>
						Price low to high
					</button>

					<button
						onClick={() => {
							handlePrice(false);
						}}
						className="bg-black text-white rounded-md hover:bg-gray-700 hover:scale-95 duration-150 px-7 py-2"
					>
						Price high to low
					</button>
				</div>
				<CategoryList category={filteredCat} categoryPage={true} />
			</div>
		</div>
	);
};

export default CategoryPage;
