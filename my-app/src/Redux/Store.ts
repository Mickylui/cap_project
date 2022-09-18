import { configureStore } from "@reduxjs/toolkit";
// import { postListReducer } from "./platform/reducer";
// import {IAccountState} from "./Slice/AccountSlice"

import accountReducer from "./Slice/AccountSlice";
import postsReducer from "./Slice/PlatformSlice";

export const store = configureStore({
    reducer: { account: accountReducer, platform: postsReducer},
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
