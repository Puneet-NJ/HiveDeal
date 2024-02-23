import React from "react";
import { Link } from "react-router-dom";

const CartItems = (props) => {
	const { item, totalItems, count, setCountFunc, handleRemoveItem } = props;

	if (!item) return;

	function toBase64(arr) {
		//arr = new Uint8Array(arr) if it's an ArrayBuffer
		return btoa(
			arr?.reduce((data, byte) => data + String.fromCharCode(byte), "")
		);
	}

	return (
		<div>
			<div className="flex justify-between mx-7 border-b border-gray-400">
				<div className="flex">
					<img
						src={
							"data:" +
							item?.images?.[0]?.contentType +
							";base64," +
							toBase64(item?.images?.[0]?.data?.data)
						}
						alt="Product"
						className="w-28 h-32 p-5"
					/>
					<div className="mt-3">
						<Link to={"/" + item?.category + "/" + item?._id}>
							<h1 className="font-semibold hover:text-blue-500">
								{item?.productName}
							</h1>
						</Link>
						<div className="text-sm text-gray-600">{item?.sellerName}</div>
						<div className="font-semibold mt-2">₹{item?.price}</div>
					</div>
				</div>
				<div className="mr-10 flex flex-col justify-center">
					<button
						onClick={handleRemoveItem}
						className="hover:text-red-500 hover:scale-95 duration-150 px-2 mb-1 font-semibold"
					>
						REMOVE
					</button>
					<div className="flex bg-slate-400 p-2">
						<button
							onClick={() => count > 1 && setCountFunc(false)}
							className="hover:bg-red-400 px-2 hover:text-white  rounded-md mr-2"
						>
							-
						</button>
						<div className=" mr-2">{totalItems}</div>
						<button
							onClick={() => setCountFunc(true)}
							className="hover:bg-green-400 px-2 hover:text-white rounded-md "
						>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItems;
