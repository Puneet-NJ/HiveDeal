import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomersList } from "../../../Utils/adminSlice";

const useCustomers = () => {
	const token = useSelector((store) => store.user.token);
	const dispatch = useDispatch();

	useEffect(() => {
		const func = async () => {
			const data = await fetch("http://localhost:3000/admin/home", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const json = await data.json();
			console.log(json);
			dispatch(addCustomersList(json.cutomersList));
		};

		func();
	}, []);
};

export default useCustomers;
