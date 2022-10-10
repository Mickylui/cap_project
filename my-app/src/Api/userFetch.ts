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

export const getUserPostFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@User/getUserPost" as const,
    async (userId, thunkAPI) => {
        try {

            const resp = await fetch(`${DEVELOP_HOST}/user/getUserPost/${userId}`)
            const result = await resp.json();
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue({
                error: "Failed to log in.",
            } as Error);
        }
    }
);

export const getUserLikePostFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@User/getUserLikePost" as const,
    async (userId, thunkAPI) => {
        try {

            const resp = await fetch(`${DEVELOP_HOST}/user/getUserLikePost/${userId}`)
            const result = await resp.json();
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue({
                error: "Failed to log in.",
            } as Error);
        }
    }
);
