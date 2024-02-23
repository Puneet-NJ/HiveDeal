import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import CategoryPage from "./CategoryPage";
import Product from "./Product";
import Cart from "./Cart";
import CategoryPageError from "./CategoryPageError";
import NoProduct from "./NoProduct";
import Profile from "./Profile";
import PlaceOrder from "./PlaceOrder";

const Main = () => {
	return (
		<Routes>
			<Route path="/">
				<Route index element={<Browse />}></Route>
				<Route path=":category">
					<Route index element={<CategoryPage />}></Route>
					<Route path=":id" element={<Product />}></Route>

					<Route path="noProduct" element={<NoProduct />}></Route>
				</Route>
			</Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/cart" element={<Cart />}></Route>
			<Route path="/profile" element={<Profile />}></Route>
			<Route path="/place-order" element={<PlaceOrder />}></Route>

			<Route path="/gibberish" element={<CategoryPageError />}></Route>
		</Routes>
	);
};

export default Main;
