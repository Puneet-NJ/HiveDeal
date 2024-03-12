import React from "react";

const ShowOrders = ({ orderValues }) => {
	const dates = orderValues.map((item) => item?.date);

	const dateTime = dates.map(
		(item) =>
			"ON " +
			new Date(item).getDate().toString().padStart(2, 0) +
			"-" +
			new Date(item).getMonth().toString().padStart(2, 0) +
			"-" +
			new Date(item).getFullYear() +
			" AT " +
			(new Date(item).getHours() % 12).toString().padStart(2, 0) +
			":" +
			new Date(item).getMinutes().toString().padStart(2, 0) +
			":" +
			new Date(item).getSeconds().toString().padStart(2, 0)
	);
	const dateFinal = dates.map((item, index) =>
		new Date(item).getHours() >= 12
			? dateTime[index] + "PM"
			: dateTime[index] + "AM"
	);
	console.log(dateFinal);

	function toBase64(arr) {
		//arr = new Uint8Array(arr) if it's an ArrayBuffer
		return btoa(
			arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
		);
	}

	console.log(orderValues);
	if (!orderValues) return;
	return (
		<div>
			<h1 className="mt-28 text-3xl text-center font-semibold underline underline-offset-4 py-7">
				Your Orders
			</h1>

			{orderValues.map((item, index) => {
				return (
					<div className="mx-auto w-[700px]">
						<div className="font-semibold py-3 text-lg">
							{index === 0 && dateFinal[index]}
							{index !== 0 &&
								dateFinal[index] !== dateFinal[index - 1] &&
								dateFinal[index]}
						</div>
						<div className="my-6 flex justify-between px-16">
							<div className="flex gap-4 text-md">
								<img
									alt="product"
									className="w-28 object-cover"
									src={
										"data:" +
										item?.product?.images?.[0]?.contentType +
										";base64," +
										toBase64(item?.product?.images[0]?.data?.data)
									}
								/>
								<div>
									<div className="font-semibold">
										{item.product.productName}
									</div>
									<div>{item.product.sellerName}</div>
								</div>
							</div>
							<div className="text-right">
								<div>₹{item.product.price + " x " + item.totalItems}</div>
								<div>Total: ₹{item.product.price * item.totalItems}</div>
							</div>
						</div>
						{/* <div className="border border-b-black "></div> */}
					</div>
				);
			})}
		</div>
	);
};

export default ShowOrders;
