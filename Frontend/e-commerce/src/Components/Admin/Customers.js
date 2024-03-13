import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useCustomers from "./Hooks/useCustomers";

const Customers = () => {
	useCustomers();

	const customersList = useSelector((store) => store.admin.customersList);

	console.log(customersList);

	return (
		<div className="bg-black text-white">
			<h1 className="py-20 text-4xl underline underline-offset-4 text-center font-semibold">
				Customers
			</h1>
			<div className="w-2/3 mx-auto">
				{customersList.map((customer) => {
					return (
						<div className="py-8">
							<div>
								Customer Name:{" "}
								<span className="font-bold">{customer.customerName}</span>
							</div>
							<div className="">
								Customer Email:{" "}
								<span className="font-bold">{customer.customerEmail}</span>
							</div>
							<hr />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Customers;
