import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "Cart",
	initialState: {
		cartItems: [],
	},
	reducers: {
		addCartItems: (state, action) => {
			state.cartItems.push(action.payload);
		},
		updateCartItems: (state, action) => {
			state.cartItems = action.payload;
		},
		clearCartItems: (state, action) => {
			state.cartItems = [];
		},
	},
});

export const { addCartItems, updateCartItems, clearCartItems } =
	cartSlice.actions;
export default cartSlice.reducer;
