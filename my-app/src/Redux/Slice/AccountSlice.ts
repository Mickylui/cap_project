import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAccountState {
    token: Array<Object>;
    isLoggedIn: boolean;
    error: undefined | string;
}
const AccountInitialState = {
    token: [],
    isLoggedIn: false,
    error: undefined,
} as IAccountState;

interface ICarriage {
    isSuccess: boolean;
    body: any;
}
interface Error {
    error: string;
}

export const LoginFetch = createAsyncThunk<ICarriage, any, { rejectValue: Error }>(
    "@account/logIn",
    async ({ email, password }, thunkAPI) => {
        try {
            console.log("trying login...");
            const resp = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const result = await resp.json()
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue({
                error: "Failed to log in.",
            } as Error);
        }
    }
);

const accountSlice = createSlice({
    name: "account",
    initialState: AccountInitialState,
    reducers: {
        //logIN
        logIn(state, action: PayloadAction<IAccountState>) {
            state.token.push(action.payload);
        },
        //logOut
        logOut(state, action: PayloadAction<IAccountState>) {
            state.token = [];
        },

        //signUp
        signUp(state, action: PayloadAction<IAccountState>) {
            state.token.push(action.payload);
        },
    },
});

export const { logIn, logOut, signUp } = accountSlice.actions;

export default accountSlice.reducer;
