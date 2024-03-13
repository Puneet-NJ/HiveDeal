import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import useAdmin from "./Hooks/useAdmin";

const Admin = () => {
	const navigate = useNavigate();
	useAdmin();

	const adminInfo = useSelector((store) => store.admin.adminInfo);

	const handleAddItem = () => {
		navigate("/admin/addItem");
	};

	const handleRemoveItem = () => {
		navigate("/admin/RemoveItem");
	};

	const handleDisplayCustomers = () => {
		navigate("/admin/customers");
	};

	console.log(adminInfo);
	return (
		<div className=" bg-black text-white">
			<h1 className="pt-20 text-4xl font-semibold text-center underline underline-offset-4">
				Admin
			</h1>

			<div className="w-4/6 mx-auto mt-10">
				<h2 className="text-3xl underline underline-offset-4">Stats</h2>
				<div className="mt-10 grid grid-cols-2 gap-40">
					<div className="border p-10">
						Revenue:{" "}
						<span className="font-bold text-green-400">
							₹{adminInfo?.revenue?.[0]?.total}
						</span>
					</div>
					<div className="border p-10">
						Maximum ordered item:{" "}
						<span className="font-bold text-blue-400">
							{adminInfo?.maxOrdered?.[0]?.productName} (
							{adminInfo?.maxOrdered?.[0]?.totalItems} times)
						</span>
					</div>
					<div className="border p-10">
						Least ordered item:{" "}
						<span className="font-bold text-red-400">
							{adminInfo?.minOrdered?.[0]?.productName} (
							{adminInfo?.minOrdered?.[0]?.totalItems} times)
						</span>
					</div>
					<div className="border p-10">
						Total users:{" "}
						<span className="font-bold text-orange-500">
							{adminInfo?.totalUsers}
						</span>
					</div>
				</div>
			</div>

			<div className="w-4/6 mx-auto mt-32">
				<h2 className="text-3xl underline underline-offset-4">
					Add & Remove items
				</h2>
				<div className="py-16 flex justify-evenly">
					<button
						onClick={handleAddItem}
						className="bg-white text-black px-10 py-5 text-lg hover:scale-95 duration-150 hover:bg-green-400"
					>
						Add Item
					</button>
					<button
						onClick={handleRemoveItem}
						className="bg-white text-black px-10 py-5 text-lg hover:scale-95 duration-150 hover:bg-red-400"
					>
						Remove Item
					</button>
				</div>
			</div>

			<div className="w-4/6 mx-auto mt-32">
				<h2 className="text-3xl underline underline-offset-4">Customers</h2>
				<div className="py-16 flex justify-evenly">
					<button
						onClick={handleDisplayCustomers}
						className="bg-white text-black px-10 py-5 text-lg hover:scale-95 duration-150 hover:bg-lime-400"
					>
						Display all customers
					</button>
				</div>
			</div>
		</div>
	);
};

export default Admin;
