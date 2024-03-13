import React from "react";

const AddItem = () => {
	return (
		<div className="flex justify-center items-center h-screen bg-black text-white">
			<form className="flex flex-col gap-5 justify-between border border-white rounded-md p-10">
				<h1 className="text-2xl font-semibold">Item info</h1>
				<input
					className="px-5 py-2 outline-none border text-black rounded-sm"
					placeholder="Enter Product Name"
				></input>
				<input
					className="px-5 py-2 outline-none border text-black rounded-sm"
					placeholder="Enter Seller Name"
				></input>
				<input
					className="px-5 py-2 outline-none border text-black rounded-sm"
					placeholder="Enter Price"
				></input>

				<div className="flex flex-col mt-4">
					<label for="category" className="font-semibold">
						Choose Category
					</label>
					<select id="category" className="text-black outline-none mt-2 p-1">
						<option>Mobiles</option>
						<option>Clothes</option>
						<option>Bags</option>
						<option>Snacks</option>
						<option>Laptops</option>
					</select>
				</div>
			</form>
		</div>
	);
};

export default AddItem;
