import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import profileSlice from "./profileSlice";

const appStore = configureStore({
	reducer: {
		items: itemsSlice,
		cart: cartSlice,
		user: userSlice,
		profile: profileSlice,
	},
});

export default appStore;
