import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { getCartFetch } from "../../Api/productFetch";

export interface CartItemState {
    id: number;
    product_id: number;
    name: string;
    size: number;
    quantity: number;
    unit_price: number;
}

export interface ICartList {
    list: CartItemState[];
    status: string;
    error: string;
}

let CartListInitialState: ICartList;

CartListInitialState = {
    list: [
        { id: 1, product_id: 1, name: "skateboard", size: 7, quantity: 2, unit_price: 200 },
        { id: 2, product_id: 1, name: "skateboard", size: 7, quantity: 1, unit_price: 300 },
    ],
    status: "",
    error: "",
};

const cartSlice = createSlice({
    name: "@Cart",
    initialState: CartListInitialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItemState>) {
            // get item from action
            // fetch server - insert cart item
            // once success -> add to state.list
            state.list.push(action.payload);
        },
        // incrementQuantity(state, action: PayloadAction<any>) {
        //     let index = state.list.findIndex((item) => item.id === action.payload.id);
        //     state.list[index].quantity++;
        // },
        // decrementQuantity(state, action: PayloadAction<any>) {
        //     let index = state.list.findIndex((item) => item.id === action.payload.id);
        //     state.list[index].quantity--;
        // },
        removeCartItem(state, action: PayloadAction<number>) {},
    },
    extraReducers(builder) {
        builder
            .addCase(getCartFetch.pending, (state) => {
                const nextState = produce(CartListInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(getCartFetch.fulfilled, (state, action) => {
                const cartItems = action.payload.body;
                const nextState = produce(CartListInitialState, (draft) => {
                    draft.status = "succeeded";
                    draft.list = cartItems;
                });
                state = nextState;

                return state;
            })
            .addCase(getCartFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            });
    },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeCartItem } =
    cartSlice.actions;
