import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { cancelOrderFetch, getOrderFetch, shipOrderFetch } from "../../Api/adminFetch";

export interface IAdminState {
    status: string;
    orderData: Array<IOrderDataState>;
    error: undefined | string;
}
export interface IOrderDataState {
    order_id: string;
    delivery_address: string;
    contact: string;
    account_name: string;
    icon: string;
    user_id: string;
    name_size_quantity_price: Array<string>;
}

const AdminInitialState = {
    status: "",
    orderData: [],
    error: undefined,
} as IAdminState;

const adminSlice = createSlice({
    name: "@Admin",
    initialState: AdminInitialState,
    reducers: {
        getOrder(state, action: PayloadAction<IAdminState>) {
        },
        shipOrder() {},
        cancelOrder() {},
    },
    extraReducers(builder) {
        builder
            .addCase(getOrderFetch.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getOrderFetch.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.orderData = action.payload.body;
            })
            .addCase(getOrderFetch.rejected, (state, action) => {
                state.status = "rejected"
            })
    },
});

export const { getOrder, shipOrder, cancelOrder } = adminSlice.actions;
// console.log("this is logIn actions:", logIn)

export default adminSlice.reducer;
