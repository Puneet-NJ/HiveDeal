import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfile } from "../Utils/profileSlice";

const useProfile = () => {
	const token = useSelector((store) => store.user.token);
	const dispatch = useDispatch();

	useEffect(() => {
		const func = async () => {
			const data = await fetch("http://localhost:3000/customer/profile", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const json = await data.json();

			// console.log(json);
			dispatch(addProfile(json));
		};
		func();
	}, []);
};

export default useProfile;
