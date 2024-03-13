import React from "react";

const Admin = () => {
	return (
		<div className="h-screen bg-black text-white">
			<h1 className="pt-20 text-4xl font-semibold text-center underline underline-offset-4">
				Admin
			</h1>

			<div className="w-4/6 mx-auto mt-10">
				<h2 className="text-3xl underline underline-offset-4">Stats</h2>
				<div className="mt-10 grid grid-cols-2 gap-40">
					<div className="border p-10">Revenue: ₹{}</div>
					<div className="border p-10">Maximum ordered item: {}</div>
					<div className="border p-10">Least ordered item: {}</div>
					<div className="border p-10">Total users: {}</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;