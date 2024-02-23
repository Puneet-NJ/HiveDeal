import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
	name: "Items",
	initialState: {
		mobiles: null,
		clothes: null,
		bags: null,
		snacks: null,
		laptops: null,
	},
	reducers: {
		addMobiles: (state, action) => {
			state.mobiles = action.payload;
		},
		addSnacks: (state, action) => {
			state.snacks = action.payload;
		},
		addBags: (state, action) => {
			state.bags = action.payload;
		},
		addLaptops: (state, action) => {
			state.laptops = action.payload;
		},
		addClothes: (state, action) => {
			state.clothes = action.payload;
		},
	},
});

export const { addBags, addClothes, addLaptops, addMobiles, addSnacks } =
	itemsSlice.actions;
export default itemsSlice.reducer;
