import { configureStore } from "@reduxjs/toolkit";
import myProfileReducer from "../features/profile/myProfileSlice";

export const store = configureStore({
	reducer: myProfileReducer,
});
