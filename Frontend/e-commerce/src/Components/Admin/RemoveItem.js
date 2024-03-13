import React, { useEffect, useState } from "react";
import useFetchProducts from "../../Hooks/useFetchProducts";
import { useSelector } from "react-redux";

const RemoveItem = () => {
	useFetchProducts();

	const [dummyRender, setDummyRender] = useState(false);

	const items = useSelector((store) => store.items);
	const token = useSelector((store) => store.user.token);

	function toBase64(arr) {
		//arr = new Uint8Array(arr) if it's an ArrayBuffer
		return btoa(
			arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
		);
	}

	useEffect(() => {}, [dummyRender]);

	const handleRemoveItem = async (id) => {
		const data = await fetch("http://localhost:3000/admin/removeproduct", {
			method: "POST",
			body: JSON.stringify({
				productId: id,
			}),
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const json = await data.json();
		console.log(data);
		console.log(json);

		if (data.ok) {
			setDummyRender(!dummyRender);
		}
	};

	console.log(items);
	return (
		<div className="w-4/5 mx-auto">
			{dummyRender && <div></div>}
			<h1 className="text-4xl font-semibold py-12 underline underline-offset-4">
				Remove item
			</h1>
			<div>
				<h1 className="text-2xl font-semibold">Bags</h1>
				<div className="flex w-full justify-between">
					{items.bags.map((item) => {
						return (
							<div
								onClick={() => {
									handleRemoveItem(item._id);
								}}
								className="p-5 hover:border duration-150 hover:scale-95 hover:bg-slate-300 cursor-pointer cursor-pointer"
							>
								<img
									src={
										"data:" +
										item?.images[0]?.contentType +
										";base64," +
										toBase64(item?.images[0]?.data?.data)
									}
									alt={item.productName}
									className="min-w-28 max-w-28 min-h-36 "
								/>
								<div>{item.productName}</div>
								<div>{item.sellerName}</div>
								<div>₹{item.price}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div>
				<h1 className="text-2xl font-semibold pt-10">Clothes</h1>
				<div className="flex w-full justify-between">
					{items.clothes.map((item) => {
						return (
							<div className="p-5 hover:border duration-150 hover:scale-95 hover:bg-slate-300 cursor-pointer">
								<img
									src={
										"data:" +
										item?.images[0]?.contentType +
										";base64," +
										toBase64(item?.images[0]?.data?.data)
									}
									alt={item.productName}
									className="min-w-28 max-w-28 min-h-40 object-cover"
								/>
								<div>{item.productName}</div>
								<div>{item.sellerName}</div>
								<div>₹{item.price}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div>
				<h1 className="text-2xl font-semibold pt-10">Laptops</h1>
				<div className="flex w-full justify-between">
					{items.laptops.map((item) => {
						return (
							<div className="p-5 hover:border duration-150 hover:scale-95 hover:bg-slate-300 cursor-pointer">
								<img
									src={
										"data:" +
										item?.images[0]?.contentType +
										";base64," +
										toBase64(item?.images[0]?.data?.data)
									}
									alt={item.productName}
									className="min-w-28 max-w-28 h-40 "
								/>
								<div>{item.productName}</div>
								<div>{item.sellerName}</div>
								<div>₹{item.price}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div>
				<h1 className="text-2xl font-semibold pt-10">Mobiles</h1>
				<div className="flex w-full justify-between">
					{items.mobiles.map((item) => {
						return (
							<div className="p-5 hover:border duration-150 hover:scale-95 hover:bg-slate-300 cursor-pointer">
								<img
									src={
										"data:" +
										item?.images[0]?.contentType +
										";base64," +
										toBase64(item?.images[0]?.data?.data)
									}
									alt={item.productName}
									className="min-w-28 max-w-28 min-h-40 object-fit"
								/>
								<div>{item.productName}</div>
								<div>{item.sellerName}</div>
								<div>₹{item.price}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div>
				<h1 className="text-2xl font-semibold pt-10">Snacks</h1>
				<div className="flex w-full justify-between">
					{items.snacks.map((item) => {
						return (
							<div className="p-5 hover:border duration-150 hover:scale-95 hover:bg-slate-300 cursor-pointer">
								<img
									src={
										"data:" +
										item?.images[0]?.contentType +
										";base64," +
										toBase64(item?.images[0]?.data?.data)
									}
									alt={item.productName}
									className="min-w-28 max-w-28 min-h-40 object-fit"
								/>
								<div>{item.productName}</div>
								<div>{item.sellerName}</div>
								<div>₹{item.price}</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default RemoveItem;
