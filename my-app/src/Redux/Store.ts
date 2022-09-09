import { configureStore } from "@reduxjs/toolkit";
// import {IAccountState} from "./Slice/AccountSlice"

import accountReducer from "./Slice/AccountSlice";


export const store = configureStore({
    reducer: {account: accountReducer},
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;