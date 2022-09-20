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
            const posts = await res.json();
            return posts;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot get PRODUCTS." } as Error);
        }
    }
);