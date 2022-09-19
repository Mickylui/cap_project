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
export const getPostFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@posts/get",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${DEVELOP_HOST}/posts/`);
            const posts = await res.json();
            return posts;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot get POSTS." } as Error);
        }
    }
);
export const getSearchTagPostFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@posts/getSearchTagPost",
    async (tag, thunkAPI) => {
        console.log("getSearchTagPostFetch:",tag)
        try {
            const res = await fetch(`${DEVELOP_HOST}/posts/getSearchTagPost?tag=${tag}`);
            const posts = await res.json();
            return posts;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot get POSTS." } as Error);
        }
    }
);

export const addPostFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@posts/addPost",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(`${DEVELOP_HOST}/posts/addPost`);
            const posts = await res.json();
            return posts;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot get POSTS." } as Error);
        }
    }
);
