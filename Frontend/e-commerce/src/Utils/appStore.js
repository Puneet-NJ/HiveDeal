import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";

const appStore = configureStore({
	reducer: {
		items: itemsSlice,
		cart: cartSlice,
		user: userSlice,
	},
});

export default appStore;
