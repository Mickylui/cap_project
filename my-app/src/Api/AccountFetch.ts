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

export const LogInFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@Account/logIn" as const,
    async ({ email, password }, thunkAPI) => {
        try {
            const resp = await fetch(`${DEVELOP_HOST}/account/logIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const result = await resp.json();
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue({
                error: "Failed to log in.",
            } as Error);
        }
    }
);

export const getUserDataJWTFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@Account/userDataJWT" as const,
    async ({ token }, thunkAPI) => {
        try {
            const resp = await fetch(`${DEVELOP_HOST}/account/userDataJWT`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await resp.json();
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue({
                error: "Failed to log in.",
            } as Error);
        }
    }
);

// export const logOutFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
//     "@Account/logOut" as const,
//     async (_, thunkAPI) => {
//         try {
//             const resp = await fetch(`${DEVELOP_HOST}/account/logOut`);
//             const result = await resp.json();
//             return result;
//         } catch (e) {
//             return thunkAPI.rejectWithValue({
//                 error: "Failed to logOut.",
//             } as Error);
//         }
//     }
// );


