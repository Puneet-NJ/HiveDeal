import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
	name: "admin",
	initialState: {
		adminInfo: null,
		customersList: null,
	},
	reducers: {
		addAdminInfo: (state, action) => {
			state.adminInfo = action.payload;
		},
		addCustomersList: (state, action) => {
			state.customersList = action.payload;
		},
	},
});

export const { addAdminInfo, addCustomersList } = adminSlice.actions;
export default adminSlice.reducer;
