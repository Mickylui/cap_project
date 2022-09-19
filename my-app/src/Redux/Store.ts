import { configureStore } from "@reduxjs/toolkit";
// import { postListReducer } from "./platform/reducer";
// import {IAccountState} from "./Slice/AccountSlice"

import accountReducer from "./Slice/AccountSlice";
import postsReducer from "./Slice/PlatformSlice";
import productsReducer from "./Slice/ProductSlice"

export const store = configureStore({
    reducer: { account: accountReducer, platform: postsReducer, product :productsReducer},
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
