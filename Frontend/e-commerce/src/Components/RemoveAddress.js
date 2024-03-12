import React from "react";
import { useDispatch } from "react-redux";
import { removeAddress } from "../Utils/userSlice";

const RemoveAddress = () => {
	const dispatch = useDispatch();

	const handleRemoveAddress = () => {
		dispatch(removeAddress());
	};

	return (
		<div className="pt-60 mx-auto w-1/2 flex justify-center">
			<button
				onClick={handleRemoveAddress}
				className="p-3 bg-slate-300 shadow-lg hover:scale-95 hover:duration-150 hover:bg-slate-400 hover:text-white"
			>
				Remove address
			</button>
			<button
				// onClick={handlePlaceOrder}
				className="ml-10 p-3 bg-slate-300 shadow-lg hover:scale-95 hover:duration-150 hover:bg-slate-400 hover:text-white"
			>
				Place Order with current address
			</button>
		</div>
	);
};

export default RemoveAddress;
