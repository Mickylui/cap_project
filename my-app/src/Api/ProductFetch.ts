import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItemState } from "../Redux/Slice/cartSlice";
import { ProductState } from "../Redux/Slice/productSlice";
import Swal from "sweetalert2";

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

export const removeCartItem = createAsyncThunk<
    ICarriage<CartItemState>,
    { token: string | null; product_id: number },
    { rejectValue: Error }
>("@cart/remove", async ({ token, product_id }, thunkAPI) => {
    console.log("check remove thunk", product_id);
    try {
        const res = await fetch(`${DEVELOP_HOST}/products/cart/remove`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({product_id: product_id }),
        })
    
        return res.json()
        // const deleteResult = await res.json();
        // if (deleteResult.success === true) {
        //     Swal.fire({
        //         title: 'Are you sure?',
        //         text: "You won't be able to revert this!",
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonColor: '#3085d6',
        //         cancelButtonColor: '#d33',
        //         confirmButtonText: 'Yes, remove it!'
        //       }).then((result) => {
        //         if (result.isConfirmed) {
        //           Swal.fire(
        //             'Removed!',
        //             'Your item has been removed.',
        //             'success'
        //           )
        //         }
        //       });   
        // }
        
    } catch {
        return thunkAPI.rejectWithValue({ error: "Failed to remove item" } as Error);
    }
});

export const clearCartItems = createAsyncThunk<
    ICarriage<Array<CartItemState>>,
    { token: string | null, id: number },
    { rejectValue: Error }
>("@cart/checkout", async ({ token }, thunkAPI) => {
    try {
        const res = await fetch(`${DEVELOP_HOST}/products/cart/checkout`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const checkoutItems = await res.json();
        return checkoutItems;
    } catch {
        return thunkAPI.rejectWithValue({ error: "Cannot get CART." } as Error);
    }
});










