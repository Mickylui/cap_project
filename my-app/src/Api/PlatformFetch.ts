import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../Redux/store";

interface ICarriage {
    success: boolean;
    body: any;
    message: string;
}
interface Error {
    error: string;
}

const DEVELOP_HOST = process.env.REACT_APP_API_URL;
export const getUserPostFetch = createAsyncThunk<
    ICarriage,
    { init?: boolean },
    { rejectValue: Error; state: RootState }
>("@posts/getUserPost", async ({ init }, thunkAPI) => {
    try {

        const page = init ? 1 : thunkAPI.getState().platform.pageNum+1;
        const token = window.localStorage.getItem("token");
        const res = await fetch(`${DEVELOP_HOST}/posts/userPost?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const posts = await res.json();
        return posts;
    } catch {
        return thunkAPI.rejectWithValue({ error: "Cannot get POSTS." } as Error);
    }
});
export const getAdminPostFetch = createAsyncThunk<ICarriage, void, { rejectValue: Error }>(
    "@posts/getAdminPost",
    async (_, thunkAPI) => {
        try {
            const token = window.localStorage.getItem("token");
            const res = await fetch(`${DEVELOP_HOST}/posts/adminPost`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const posts = await res.json();
            return posts;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot get POSTS." } as Error);
        }
    }
);

export const getSearchTagPostFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@posts/getSearchTagPost",
    async ({ tag }, thunkAPI) => {
        try {
            const token = window.localStorage.getItem("token");
            const res = await fetch(`${DEVELOP_HOST}/posts/getSearchTagPost?tag=${tag}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const posts = await res.json();
            return posts;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot search tag." } as Error);
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
            return thunkAPI.rejectWithValue({ error: "Cannot add post." } as Error);
        }
    }
);

export const getPostDetailByPostIdFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@posts/getPostDetailByPostId",
    async (postId, thunkAPI) => {
        try {
            const token = window.localStorage.getItem("token");
            const res = await fetch(
                `${DEVELOP_HOST}/posts/getPostDetailByPostId?postId=${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const posts = await res.json();
            return posts;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot get post detail." } as Error);
        }
    }
);

export const getSearchContentPostFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@posts/getSearchContentPost",
    async ({ keyword }, thunkAPI) => {
        try {

            const token = window.localStorage.getItem("token");
            const res = await fetch(
                `${DEVELOP_HOST}/posts/getSearchContentPost?keyword=${keyword}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const posts = await res.json();
            return posts;
        } catch {
            return thunkAPI.rejectWithValue({ error: "Cannot search content." } as Error);
        }
    }
);
