import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "User",
	initialState: {
		user: null,
		address: null,
		token: null,
		cartID: null,
	},
	reducers: {
		addUser: (state, action) => {
			state.user = action.payload;
		},
		removeUser: (state, action) => {
			state.user = null;
		},

		addAddress: (state, action) => {
			state.address = action.payload;
		},
		removeAddress: (state, action) => {
			state.address = null;
		},

		addToken: (state, action) => {
			state.token = action.payload;
		},

		addCartID: (state, action) => {
			state.cartID = action.payload;
		},
	},
});

export const {
	addUser,
	removeUser,
	addAddress,
	removeAddress,
	addToken,
	addCartID,
} = userSlice.actions;
export default userSlice.reducer;