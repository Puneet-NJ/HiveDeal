import React, { useEffect, useState } from "react";
import LOGIN_IMG from "../images/login-img.jpg";
import Header from "./Header";
import { useFormik } from "formik";
import { loginSchema } from "./schemas";
import { useNavigate } from "react-router-dom";
import { addToken, addUser } from "../Utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const initialValues = {
	customerName: "",
	customerEmail: "",
	customerPassword: "",
};

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// const schema = ;

	const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
		useFormik({
			initialValues: initialValues,
			validationSchema: loginSchema(isSignInForm),
			onSubmit: async (values, action) => {
				dispatch(addUser(values));
				if (isSignInForm) {
					const data = await fetch("http://localhost:3000/customer/login", {
						method: "POST",
						body: JSON.stringify({
							customerEmail: values.customerEmail,
							customerPassword: values.customerPassword,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});

					const admin = await fetch("http://localhost:3000/admin/login", {
						method: "POST",
						body: JSON.stringify({
							adminName: values.customerEmail,
							adminPass: values.customerPassword,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});

					const user = await data.json();
					const admin2 = await admin.json();
					console.log(admin2);

					if (admin2?.admin) {
						console.log(admin2.token);
						dispatch(addToken(admin2.token));
						navigate("/admin");
					}
					if (user?.auth) {
						dispatch(addToken(user.token));
						navigate("/");
					}
				} else {
					// Sign Up form

					dispatch(addUser(values));
					const data = await fetch("http://localhost:3000/customer/register", {
						method: "POST",
						body: JSON.stringify({
							customerName: values.customerName,
							customerEmail: values.customerEmail,
							customerPassword: values.customerPassword,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});

					const auth = await data.json();
					console.log(auth);
					if (auth?.auth) navigate("/");
					dispatch(addToken(auth.token));
				}

				accessToBrowse();

				action.resetForm();
			},
		});

	const handleChangeForm = () => {
		setIsSignInForm(!isSignInForm);
	};

	const accessToBrowse = async () => {
		const data = await fetch("http://localhost:3000/customer/login");
		const json = await data.json();

		console.log(json);
		// if (json.auth) navigate("/");
	};

	return (
		<div>
			<Header ifInCart={false} ifInLogin={true} />
			<div className="pt-32">
				<div className="w-6/12 mx-auto flex bg-slate-400 mt-16">
					<img src={LOGIN_IMG} alt="Login" className="w-1/2" />

					<div className="w-1/2 ">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col items-center pt-28"
						>
							{!isSignInForm && (
								<div className="">
									<input
										className="p-3 outline-none my-2 w-60 rounded"
										placeholder="Full Name"
										name="customerName"
										type="text"
										value={values.customerName}
										onBlur={handleBlur}
										onChange={handleChange}
									/>
									{touched.customerName && errors.customerName ? (
										<div className="font-semibold text-red-600 text-xs">
											{errors.customerName}
										</div>
									) : null}
								</div>
							)}
							<div className="">
								<input
									className="p-3 outline-none my-2 w-60 rounded"
									placeholder="Email"
									name="customerEmail"
									type="text"
									value={values.customerEmail}
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								{touched.customerEmail && errors.customerEmail ? (
									<div className="font-semibold text-red-600 text-xs">
										{errors.customerEmail}
									</div>
								) : null}
							</div>

							<div>
								{/* <label htmlFor="customerPassword">Enter customerPassword</label> */}
								<input
									className="p-3 outline-none my-2 w-60 rounded"
									placeholder="Password"
									name="customerPassword"
									type="customerPassword"
									value={values.customerPassword}
									onBlur={handleBlur}
									onChange={handleChange}
								/>
							</div>
							{touched.customerPassword && errors.customerPassword ? (
								<div className="self-start mx-16 font-semibold text-red-600 text-xs text-left">
									{errors.customerPassword}
								</div>
							) : null}

							<button className="px-10 bg-white py-2 rounded-3xl mt-7 hover:scale-110 duration-200">
								{isSignInForm ? "Sign In" : "Sign Up"}
							</button>
						</form>

						<p className="text-center mt-12">
							{isSignInForm ? "New here?" : "Existing user?"}{" "}
							<button
								onClick={handleChangeForm}
								className="hover:border-b border-black"
							>
								{isSignInForm ? "Sign Up" : "Sign In"}
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
