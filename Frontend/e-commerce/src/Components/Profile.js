import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

const Profile = () => {
	const userInfo = useSelector((store) => store.user.user);

	return (
		<div>
			<Header />

			<div className="w-[80%] mx-auto pt-40">
				<div className="">Email: {userInfo?.customerEmail}</div>
				<div className="">Name: {userInfo?.customerName}</div>
			</div>
		</div>
	);
};

export default Profile;
