import React, { useRef } from "react"; // Import React
import { useDispatch } from "react-redux";
import { addAddress } from "../Utils/userSlice";

const Address = () => {
	const cNo = useRef(null);
	const house = useRef(null);
	const street = useRef(null); 
	const landmark = useRef(null);
	const city = useRef(null);

	const dispatch = useDispatch();

	const handleAddAddress = () => {
		const address = {
			contact: cNo.current.value,
			house: house.current.value,
			street: street.current.value,
			landmark: landmark.current.value,
			city: city.current.value,
		};

		dispatch(addAddress(address));
	};

	return (
		<div className="pt-48">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddAddress();
				}}
				className="bg-slate-400 w-1/2 mx-auto px-6 pb-7 rounded shadow-2xl"
			>
				<h1 className="text-xl font-bold py-5">Add Address</h1>

				<div>
					<h2 className="font-semibold">Contact Details</h2>

					<input
						className="w-full mt-2 p-2 outline-none"
						ref={cNo}
						placeholder="Contact Number"
						required
					/>
				</div>

				<div className="mt-4">
					<h2 className="font-semibold">Address Details</h2>
					<input
						className="w-full mt-2 p-2 outline-none"
						ref={house}
						placeholder="House / Flat no"
						required
					/>
					<input
						className="w-full mt-2 p-2 outline-none"
						ref={street}
						placeholder="Street / Locality"
						required
					/>
					<input
						className="w-full mt-2 p-2 outline-none"
						ref={landmark}
						placeholder="Landmark"
						required
					/>
					<input
						className="w-full mt-2 p-2 outline-none"
						ref={city}
						placeholder="City"
						required
					/>
				</div>

				<button className="w-full mt-10 p-3 font-semibold bg-gray-200 hover:bg-green-400 hover:text-white duration-300">
					Add Address
				</button>
			</form>
		</div>
	);
};

export default Address;
