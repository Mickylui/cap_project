import { configureStore } from "@reduxjs/toolkit";
// import { postListReducer } from "./platform/reducer";
// import {IAccountState} from "./Slice/AccountSlice"

import accountReducer from "./Slice/accountSlice";
import postsReducer from "./Slice/platformSlice";
import productsReducer from "./Slice/productSlice";
import userReducer from "./Slice/userSlice";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        platform: postsReducer,
        product: productsReducer,
        user: userReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
