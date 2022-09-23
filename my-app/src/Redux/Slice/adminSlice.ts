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
            console.log("@Admin/getOrder:", state);
        },
        shipOrder() {},
        cancelOrder() {},
    },
    extraReducers(builder) {
        builder
            .addCase(getOrderFetch.pending, (state, action) => {
                // console.log("this is getOrderFetch:", action);
            })
            .addCase(getOrderFetch.fulfilled, (state, action) => {
                console.log("this is getOrderFetch.fulfilled:", action.payload.body);
                state.orderData = action.payload.body;
            })
            .addCase(getOrderFetch.rejected, (state, action) => {
                // console.log("this is getOrderFetch:", action);
            })
            .addCase(shipOrderFetch.pending, (state, action) => {})
            .addCase(shipOrderFetch.fulfilled, (state, action) => {
                // need shopping cart data
            })
            .addCase(shipOrderFetch.rejected, (state, action) => {})
            .addCase(cancelOrderFetch.pending, (state, action) => {})
            .addCase(cancelOrderFetch.fulfilled, (state, action) => {
                // need shopping cart data
            })
            .addCase(cancelOrderFetch.rejected, (state, action) => {});
    },
});

export const { getOrder, shipOrder, cancelOrder } = adminSlice.actions;
// console.log("this is logIn actions:", logIn)

export default adminSlice.reducer;
