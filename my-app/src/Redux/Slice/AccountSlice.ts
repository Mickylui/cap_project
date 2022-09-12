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


const accountSlice = createSlice({
    name: "Account",
    initialState: AccountInitialState,
    reducers: {
        //logIN
        logIn(state, action: PayloadAction<IAccountState>) {
            state.isLoggedIn = true;
            console.log("action.payload:",action.payload)
            state.token.push(action.payload);
        },
        //logOut
        logOut(state, action: PayloadAction<IAccountState>) {
            state.isLoggedIn = false;
            state.token = [];
        },

        //signUp
        signUp(state, action: PayloadAction<IAccountState>) {
            state.token.push(action.payload);
        },
    },
});

export const { logIn, logOut, signUp } = accountSlice.actions;
// console.log("this is logIn actions:", logIn)

export default accountSlice.reducer;
