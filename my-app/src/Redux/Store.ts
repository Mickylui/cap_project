import { configureStore } from "@reduxjs/toolkit";
// import { postListReducer } from "./platform/reducer";
// import {IAccountState} from "./Slice/AccountSlice"

import accountReducer from "./Slice/accountSlice";
import { cartReducer } from "./Slice/cartSlice";
import postsReducer from "./Slice/platformSlice";
import productsReducer from "./Slice/productSlice";
import userReducer from "./Slice/userSlice";
import adminReducer from "./Slice/adminSlice";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        platform: postsReducer,
        product: productsReducer,
        user: userReducer,
        cart: cartReducer,
        admin: adminReducer
    },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
