import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
	name: "Profile",
	initialState: {
		profile: null,
	},
	reducers: {
		addProfile: (state, action) => {
			state.profile = action.payload;
		},
	},
});

export const { addProfile } = profileSlice.actions;
export default profileSlice.reducer;
