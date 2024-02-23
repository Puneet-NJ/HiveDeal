import React from "react";
import { useDispatch } from "react-redux";
import { removeAddress } from "../Utils/userSlice";

const Payment = () => {
	const dispatch = useDispatch();

	const handleRemoveAddress = () => {
		dispatch(removeAddress());
	};

	return (
		<div className="pt-40 mx-auto w-1/2">
			<button onClick={handleRemoveAddress} className="p-3 bg-slate-300 ">
				Remove address
			</button>
		</div>
	);
};

export default Payment;
