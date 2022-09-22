import { createAsyncThunk } from "@reduxjs/toolkit";

interface ICarriage {
    success: boolean;
    body: any;
    message: string;
}
interface Error {
    error: string;
}

const DEVELOP_HOST = process.env.REACT_APP_API_URL;
export const getProductFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@products/get",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${DEVELOP_HOST}/products/`);
            const products = await res.json();
            return products;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot get PRODUCTS." } as Error);
        }
    }
);

export const getProductDetailByProductIdFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@products/getProductDetailByProductIdFetch",
    async (productId, thunkAPI) => {
        try {
            const res = await fetch(`${DEVELOP_HOST}/products/getProductDetailByProductIdFetch?productId=${productId}`);
            const products = await res.json();
            return products;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot get PRODUCTS." } as Error);
        }
    }
);

export const getCartFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@cart/get",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${DEVELOP_HOST}/cart/`);
            const cartItems = await res.json();
            return cartItems;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot get CART." } as Error);
        }
    }
);

export const removeCartItem = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@cart/delete",
    async (id, thunkAPI) => {
        try {
            const res = await fetch(`${DEVELOP_HOST}/cart/:id` ,
            {method: 'delete'})
            const cartItems = await res.json();
            return cartItems;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Failed to remove item" } as Error);
        }
    }
);


