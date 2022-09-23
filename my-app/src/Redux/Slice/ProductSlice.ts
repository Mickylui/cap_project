import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { getProductFetch, getProductDetailByProductIdFetch } from "../../Api/productFetch";

export interface ProductState {
    id: number;
    image: String;
    size: number[];
    name: string;
    description: string;
    unit_price: number;
    quantity: number;
    product_likes: number;
}

export interface IProductListState {
    list: ProductState[];
    currentSelect: number;
    status: string;
    error: string;
    productDetail: ProductState;
}

const ProductStateInitialState = {
    id: null,
    image: null,
    size: [],
    name: null,
    description: null,
    unit_price: null,
    quantity: null,
    product_likes: null,
};

export type Error = {
    error: string;
};

let ProductListInitialState: IProductListState;

ProductListInitialState = {
    list: [],
    currentSelect: 1,
    status: "",
    error: "",
    productDetail: ProductStateInitialState,
};

const productSlice = createSlice({
    name: "@Products",
    initialState: ProductListInitialState,
    reducers: {
        addProduct(state, action: PayloadAction<IProductListState>) {
            // state.list.push(action.payload)
        },
        selectProduct(state, action: PayloadAction<number>) {
            state.currentSelect = action.payload;
        },

        // update product items
        updateProduct(state, action: PayloadAction<any>) {
            let index = state.list.findIndex((item) => item.id === action.payload.id);
            state.list[index].name = action.payload.name;
        },
        updateProductDesc(state, action: PayloadAction<any>) {
            let index = state.list.findIndex((item) => item.id === action.payload.id);
            state.list[index].description = action.payload.item_description;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getProductFetch.pending, (state) => {
                const nextState = produce(ProductListInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(getProductFetch.fulfilled, (state, action) => {
                const products = action.payload.body;
                const nextState = produce(ProductListInitialState, (draft) => {
                    draft.status = "succeeded";
                    draft.list = products;
                });
                state = nextState;

                return state;
            })
            .addCase(getProductFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            })
            .addCase(getProductDetailByProductIdFetch.pending, (state) => {
                const nextState = produce(ProductListInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(getProductDetailByProductIdFetch.fulfilled, (state, action) => {
                const productItems = action.payload.body;
                const nextState = produce(ProductListInitialState, (draft) => {
                    draft.status = "succeeded";
                    draft.productDetail = productItems;
                });
                state = nextState;

                return state;
            })
            .addCase(getProductDetailByProductIdFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            });
    },
});

export const { addProduct, selectProduct, updateProduct, updateProductDesc } = productSlice.actions;
export default productSlice.reducer;
