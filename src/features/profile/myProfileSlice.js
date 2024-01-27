import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userName: "",
};

export const myProfileSlice = createSlice({
	name: "profile",
	initialState: initialState,
	reducers: {
		setUserName: (state, action) => {
			const userName = action.payload;
			state.userName = userName;
		},
	},
});

export const { setUserName } = myProfileSlice.actions;
export default myProfileSlice.reducer;
