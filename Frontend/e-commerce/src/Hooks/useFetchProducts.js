import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	addBags,
	addClothes,
	addLaptops,
	addMobiles,
	addSnacks,
} from "../Utils/itemsSlice";

const useFetchProducts = () => {
	const dispatch = useDispatch();
	const fetchData = async () => {
		const data = await fetch("http://localhost:3000/getproducts");
		const json = await data.json();

		const mobiles = json.filter((prod) => prod?.category === "Mobiles");
		const clothes = json.filter((prod) => prod?.category === "Clothes");
		const bags = json.filter((prod) => prod?.category === "Bags");
		const snacks = json.filter((prod) => prod?.category === "Snacks");
		const laptops = json.filter((prod) => prod?.category === "Laptops");

		dispatch(addMobiles(mobiles));
		dispatch(addClothes(clothes));
		dispatch(addBags(bags));
		dispatch(addSnacks(snacks));
		dispatch(addLaptops(laptops));
	};
	useEffect(() => {
		fetchData();
	}, []);
};

export default useFetchProducts;
