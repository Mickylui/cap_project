import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { getProductFetch } from "../../Api/ProductFetch";

export interface ProductState {
    id: number;
    name: string;
    description: string;
    unit_price: number;
    quantity: number;
}

export interface IProductState {
    list: ProductState[];
    currentSelect: number;
    status: string;
    error: string;
}

export type Error = {
    error: string;
};

let ProductInitialState: IProductState;

ProductInitialState = {
    list: [],
    currentSelect: 1,
    status: "",
    error: "",
};

const productSlice = createSlice({
    name: "@Products",
    initialState: ProductInitialState,
    reducers: {
        addProduct(state, action: PayloadAction<IProductState>) {
            // state.list.push(action.payload)
        },
        selectProduct(state, action: PayloadAction<number>) {
            state.currentSelect = action.payload;
        },

        // update product items
        updateProduct(state, action: PayloadAction<any>) {
            let index = state.list.findIndex((item) => item.id === action.payload.id);
            state.list[index].name = action.payload.name
        },
        updateProductDesc(state, action: PayloadAction<any>) {
            let index = state.list.findIndex((item) => item.id === action.payload.id);
            state.list[index].description = action.payload.item_description;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProductFetch.pending, (state) => {
                const nextState = produce(ProductInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(getProductFetch.fulfilled, (state, action) => {
                const products = action.payload.body;
                const nextState = produce(ProductInitialState, (draft) => {
                    draft.status = "succeeded";
                    draft.list = products;
                });
                state = nextState;

                return state;
            })
            .addCase(getProductFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            });
    },
});

export const { addProduct, selectProduct } = productSlice.actions;
export default productSlice.reducer;
