import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItemState } from "../Redux/Slice/cartSlice";
import { ProductState } from "../Redux/Slice/productSlice";

interface ICarriage<T = unknown> {
    success: boolean;
    body: T;
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

export const getProductDetailByProductIdFetch = createAsyncThunk<
    ICarriage,
    any,
    { rejectValue: Error }
>("@products/getProductDetailByProductIdFetch", async (productId, thunkAPI) => {
    try {
        const res = await fetch(
            `${DEVELOP_HOST}/products/getProductDetailByProductIdFetch?productId=${productId}`
        );
        const products = await res.json();
        return products;
    } catch {
        return thunkAPI.rejectWithValue({ error: "Cannot get PRODUCTS." } as Error);
    }
});

export const getCartFetch = createAsyncThunk<
    ICarriage<Array<CartItemState>>,
    { token: string | null },
    { rejectValue: Error }
>("@cart/get", async ({ token }, thunkAPI) => {
    try {
        const res = await fetch(`${DEVELOP_HOST}/products/cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const cartItems = await res.json();
        return cartItems;
    } catch {
        return thunkAPI.rejectWithValue({ error: "Cannot get CART." } as Error);
    }
});

export const addToCartFetch = createAsyncThunk<
    { updatedQuantity: number; cartId: number },
    { token: string | null; product: ProductState; size: number; quantity: number },
    { rejectValue: Error }
>("@cart/add", async ({ token, product, size, quantity }, thunkAPI) => {
    try {
        const res = await fetch(`${DEVELOP_HOST}/products/cart/add`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item: { product_id: product.id, size: size, quantity: quantity },
            }),
        });
        const data = await res.json();
        return { updatedQuantity: data.quantity, cartId: data.cartId };
    } catch {
        return thunkAPI.rejectWithValue({ error: "Cannot get Cart." } as Error);
    }
});

export const removeCartItem = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@cart/:id",
    async ({ token, id }, thunkAPI) => {
        try {
            const res = await fetch(`${DEVELOP_HOST}/products/cart/:id`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const cartItem = await res.json();
            return cartItem;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Failed to remove item" } as Error);
        }
    }
);
