import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

const AddItem = () => {
	const [imageSelected, setImageSelected] = useState(null);

	const productName = useRef();
	const sellerName = useRef();
	const price = useRef();
	const category = useRef();

	const token = useSelector((store) => store.user.token);
	console.log(token);

	const handleAddItem = async () => {
		if (
			!productName.current.value ||
			!sellerName.current.value ||
			!price.current.value ||
			!category.current.value ||
			!imageSelected
		) {
			alert("Please fill out all required fields.");
			return;
		}

		// Create a new FileReader instance
		const reader = new FileReader();

		// Set up event listeners
		reader.onload = async function (event) {
			// 'event.target.result' contains the data URL of the file
			const dataUrl = event.target.result;
			console.log(dataUrl);

			// Extract the binary data from the data URL
			const base64Data = dataUrl.split(",")[1];

			const formData = new FormData();

			formData.append("productName", productName.current.value);
			formData.append("sellerName", sellerName.current.value);
			formData.append("price", price.current.value);
			formData.append("category", category.current.value);
			formData.append("images", dataUrl); // Append binary data from the data URL

			try {
				const response = await fetch("http://localhost:3000/admin/addproduct", {
					method: "POST",
					body: JSON.stringify({
						productName: productName.current.value,
						sellerName: sellerName.current.value,
						price: price.current.value,
						category: category.current.value,
						images: dataUrl,
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await response.json();
				console.log(data);
				console.log("form submitted successfully");
			} catch (error) {
				console.error("Error:", error);
			}
		};

		// Read the file data as a data URL
		reader.readAsDataURL(imageSelected);
	};

	// const handleAddItem = async () => {
	// 	if (
	// 		!productName.current.value ||
	// 		!sellerName.current.value ||
	// 		!price.current.value ||
	// 		!category.current.value ||
	// 		!imageSelected
	// 	) {
	// 		alert("Please fill out all required fields.");
	// 		return;
	// 	}

	// 	// Create a new FileReader instance
	// 	const reader = new FileReader();

	// 	// Set up event listeners
	// 	reader.onload = async function (event) {
	// 		// 'event.target.result' contains the binary data of the file
	// 		const binaryData = event.target.result;

	// 		const formData = new FormData();

	// 		formData.append("productName", productName.current.value);
	// 		formData.append("sellerName", sellerName.current.value);
	// 		formData.append("price", price.current.value);
	// 		formData.append("category", category.current.value);
	// 		formData.append("images", binaryData, imageSelected.name); // Append binary data instead of file directly

	// 		try {
	// 			const response = await fetch("http://localhost:3000/admin/addproduct", {
	// 				method: "POST",
	// 				body: formData,
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			});

	// 			const data = await response.json();
	// 			console.log(data);
	// 			console.log("form submitted successfully");
	// 		} catch (error) {
	// 			console.error("Error:", error);
	// 		}
	// 	};

	// 	// Read the file data as binary data
	// 	reader.readAsArrayBuffer(imageSelected);
	// };

	return (
		<div className="flex justify-center items-center h-screen bg-black text-white">
			<form
				className="flex flex-col gap-5 justify-between border border-white rounded-md p-10"
				onSubmit={(e) => {
					e.preventDefault();
					handleAddItem();
				}}
			>
				<h1 className="text-2xl font-semibold">Item info</h1>
				<input
					className="px-5 py-2 outline-none border text-black rounded-sm"
					required
					placeholder="Enter Product Name"
					ref={productName}
				></input>
				<input
					className="px-5 py-2 outline-none border text-black rounded-sm"
					required
					placeholder="Enter Seller Name"
					ref={sellerName}
				></input>
				<input
					className="px-5 py-2 outline-none border text-black rounded-sm"
					required
					placeholder="Enter Price"
					ref={price}
				></input>

				<div className="flex flex-col mt-4">
					<label htmlFor="category" className="font-semibold">
						Choose Category
					</label>
					<select
						required
						id="category"
						className="text-black outline-none mt-2 p-1"
						ref={category}
					>
						<option>Mobiles</option>
						<option>Clothes</option>
						<option>Bags</option>
						<option>Snacks</option>
						<option>Laptops</option>
					</select>

					<div className="mt-9">
						<input
							type="file"
							required
							className="cursor-pointer"
							onChange={(e) => {
								console.log(e.target.files);
								setImageSelected(e.target.files[0]);
							}}
						/>
						{!imageSelected && (
							<div className="mt-2">Please upload images only</div>
						)}

						{imageSelected && (
							<div className="mt-4 bg-white w-40 max-h-52 flex justify-center items-center">
								<img
									className="p-4 max-w-full max-h-40 object-fill"
									src={URL.createObjectURL(imageSelected)}
									alt="not found"
								/>
							</div>
						)}
					</div>
				</div>

				<button
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						handleAddItem();
					}}
					className="mt-7 bg-white text-black text-lg w-40 mx-auto py-2 font-semibold hover:bg-green-400 duration-150 hover:scale-95"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddItem;
