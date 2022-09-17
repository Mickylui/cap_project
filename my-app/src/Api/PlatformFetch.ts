import { createAsyncThunk } from "@reduxjs/toolkit";

interface ICarriage {
    success: boolean;
    body: any;
    message: string;
}
interface Error {
    error: string;
}

const DEVELOP_HOST = "http://localhost:8080";
export const getPostFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@posts/get",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${DEVELOP_HOST}/posts`);
            const posts = await res.json();
            return posts;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot get POSTS." } as Error);
        }
    }
);
