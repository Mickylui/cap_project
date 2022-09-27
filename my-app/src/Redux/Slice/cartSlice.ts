import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToCartFetch, clearCartItems, getCartFetch, removeCartItem } from "../../Api/productFetch";

export interface CartItemState {
    id: number;
    product_id: number;
    name: string;
    size: number;
    quantity: number;
    unit_price: number;
}

export interface ICartList {
    product: CartItemState[];
    // product: Record<number, CartItemState>;
    status: string;
    error: string;
}

let CartListInitialState: ICartList;

CartListInitialState = {
    product: [
        // { id: 1, product_id: 1, name: "skateboard", size: 7, quantity: 2, unit_price: 200 },
        // { id: 2, product_id: 1, name: "skateboard", size: 7, quantity: 1, unit_price: 300 },
    ],
    status: "",
    error: "",
};

export interface Order {
    id: number;
    product_id: number;
    order_size: number;
    order_quantity: number;
    order_unit_price: number;
    order_history_id: number;
}

export interface OrderHistory {
    id: number;
    total_amount: number;
    pay_method: string;
    pay_date: string;
    status: string;
    user_id: number;
    delivery_address: string;
    email: string;
    contact: string;
}

const cartSlice = createSlice({
    name: "@Cart",
    initialState: CartListInitialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addToCartFetch.fulfilled, (state, action) => {
                const product = action.meta.arg.product;
                const foundProduct = state.product.find(
                    (p) => p.product_id === product.id && p.size === action.meta.arg.size
                );
                if (foundProduct) {
                    foundProduct.quantity = action.payload.updatedQuantity;
                } else {
                    state.product.push({
                        id: action.payload.cartId,
                        product_id: product.id,
                        name: product.name,
                        size: action.meta.arg.size,
                        quantity: action.payload.updatedQuantity,
                        unit_price: product.unit_price,
                    });
                }
            })
            .addCase(addToCartFetch.pending, (state, action) => {
                // state.loading = "pending";
            })
            .addCase(addToCartFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            })

            .addCase(getCartFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCartFetch.fulfilled, (state, action) => {
                const cartItems = action.payload.body;
                state.status = "success";
                state.product = cartItems;
            })
            .addCase(getCartFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.status = "success";
                const { id } = action.payload.body;
                state.product = state.product.filter((item) => item.id !== id);
            })
            .addCase(clearCartItems.fulfilled, (state, action) => {
                state.status = "success";
                state.product = []
            })
    },
});

export const cartReducer = cartSlice.reducer;


