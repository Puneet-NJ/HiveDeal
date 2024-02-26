import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { removeUser } from "../Utils/userSlice";
import { LOGO } from "../Utils/mockData";

const Header = ({ ifInCart, ifInLogin }) => {
	const cart = useSelector((store) => store?.cart?.cartItems);
	const user = useSelector((store) => store.user.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let items = useSelector((store) => store.items);

	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			searchText: "",
		},
		onSubmit: (values) => {
			const searchValue = values.searchText.toLowerCase();

			items = Object.entries(items);

			let prod = false;
			items.some((item) => {
				item[1].some((product) => {
					if (prod) return false;

					if (
						!prod &&
						(product.productName.toLowerCase().includes(searchValue) ||
							searchValue.toLowerCase().includes(product.productName))
					) {
						prod = true;
						navigate("/" + item[0] + "/" + product._id);
					}
				});

				if (
					!prod &&
					(item[0].includes(searchValue) || searchValue.includes(item[0]))
				) {
					prod = true;
					navigate("/" + item[0]);
					return null;
				}
			});
		},
	});

	const handleLogin = () => {
		if (user) {
			dispatch(removeUser());
		} else {
			navigate("/login");
		}
	};

	// if (!user) navigate("/login");

	return (
		<div className="fixed z-10 w-full bg-opacity-95 bg-slate-200 h-28 flex justify-between items-center px-16">
			<Link to="/">
				<div className="h-[20%] flex justify-center items-center ">
					<img className="w-32" src={LOGO} alt="logo" />
				</div>
			</Link>

			{!ifInLogin && (
				<>
					<form onSubmit={handleSubmit}>
						<input
							className="w-[500px] px-7 py-3 rounded-md shadow-lg outline-none"
							placeholder="Search for products"
							name="searchText"
							value={values.searchText}
							onChange={handleChange}
						></input>
						<button className="bg-slate-400 shadow-xl py-3 ml-1 px-5 rounded-md hover:bg-slate-500 hover:text-white duration-150">
							Search
						</button>
					</form>

					<div className="flex items-center">
						<button
							onClick={handleLogin}
							className="bg-slate-400 mr-9 shadow-xl py-3 ml-1 px-5 rounded-md hover:bg-slate-500 hover:text-white duration-150"
						>
							{user ? "Sign out" : "Login"}
						</button>
						{!ifInCart && (
							<Link to="/cart">
								<button className="bg-slate-400 shadow-xl py-3 ml-1 px-5 rounded-md hover:bg-slate-500 hover:text-white duration-150">
									<img
										alt="Cart"
										className="w-6 rounded-full inline-block"
										src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWEQD6LABnC5kTVztoatyqwmNgoXUvanemfA&usqp=CAU"
									></img>{" "}
									({cart ? cart.length : 0} items)
								</button>
							</Link>
						)}
						<Link to="/profile">
							<div className="shadow-2xl ml-7 duration-150">
								<img
									className="rounded-full w-10"
									alt="user"
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2yJWVwI9ZFnJhI3FIB5wIK4Ys7B8J-u5hfQ&usqp=CAU"
								/>
							</div>
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default Header;
