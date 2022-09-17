import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { getUserDataJWTFetch, LogInFetch } from "../../Api/AccountFetch";

export interface IAccountState {
    isLoggedIn: boolean;
    isAdmin: boolean;
    status: string;
    existUserData: Array<object>;
    error: undefined | string;
}
const AccountInitialState = {
    isLoggedIn: false,
    isAdmin: false,
    status: "",
    existUserData: [],
    error: undefined,
} as IAccountState;

const accountSlice = createSlice({
    name: "@Account",
    initialState: AccountInitialState,
    reducers: {
        //logIN
        logIn(state, action: PayloadAction<IAccountState>) {
            // console.log("this is state:",current(state))
        },
        //logOut
        logOut(state, action: PayloadAction<IAccountState>) {
            state = AccountInitialState;
            window.localStorage.clear();
            return state;
        },
        userDataJWT(state, action: PayloadAction<IAccountState>) {},
        //signUp
    },
    extraReducers(builder) {
        builder
            .addCase(LogInFetch.pending, (state, action) => {
                const nextState = produce(AccountInitialState, (draft) => {
                    // draft.isLoggedIn = false;
                    // draft.isAdmin = false;
                    draft.status = "loading";
                    // draft.existUserData = [];
                    // draft.error = undefined;
                });
                state = nextState;
                // console.log("nextState:", state.isLoggedIn);
                return state;
            })
            .addCase(LogInFetch.fulfilled, (state, action) => {
                // need shopping cart data
                if (action.payload.success === true) {
                    const identity = action.payload.body.existUserData.is_admin;
                    // console.log("identity:", identity);
                    const nextState = produce(AccountInitialState, (draft) => {
                        const token = action.payload.body.token;
                        draft.isLoggedIn = true;
                        draft.isAdmin = identity;
                        draft.status = "succeeded";
                        draft.existUserData.push(action.payload.body.existUserData);

                        // draft.error = undefined;
                        window.localStorage.setItem("token", token);
                    });
                    state = nextState;
                } else {
                    const nextState = produce(AccountInitialState, (draft) => {
                        // draft.isLoggedIn = false;
                        // draft.isAdmin = false;
                        draft.status = "succeeded";
                        // draft.existUserData = [];
                        draft.error = action.payload.message;
                    });
                    state = nextState;
                }
                return state;
            })
            .addCase(LogInFetch.rejected, (state, action) => {
                const nextState = produce(AccountInitialState, (draft) => {
                    // draft.isLoggedIn = false;
                    // draft.isAdmin = false;
                    draft.status = "failed";
                    // draft.existUserData = [];
                    // draft.error = undefined;
                });
                state = nextState;
                return state;
            })
            .addCase(getUserDataJWTFetch.pending, (state, action) => {
                const nextState = produce(AccountInitialState, (draft) => {
                    // draft.isLoggedIn = false;
                    // draft.isAdmin = false;
                    draft.status = "loading";
                    // draft.existUserData = [];
                    // draft.error = undefined;
                });
                state = nextState;
                // console.log("nextState:", state.isLoggedIn);
                return state;
            })
            .addCase(getUserDataJWTFetch.fulfilled, (state, action) => {
                // need shopping cart data
                const nextState = produce(AccountInitialState, (draft) => {
                    const data = action.payload.body;
                    draft.isLoggedIn = true;
                    draft.isAdmin = data.is_admin;
                    draft.status = "succeeded";
                    draft.existUserData.push(data);
                    // draft.error = undefined;
                });
                state = nextState;
                // console.log("error:", state.error);
                return state;
            })
            .addCase(getUserDataJWTFetch.rejected, (state, action) => {
                const nextState = produce(AccountInitialState, (draft) => {
                    // draft.isLoggedIn = false;
                    // draft.isAdmin = false;
                    draft.status = "failed";
                    // draft.existUserData = [];
                    // draft.error = undefined;
                });
                state = nextState;
                // console.log("nextState:", state.isLoggedIn);
                return state;
            });
    },
});

export const { logIn, logOut, signUp } = accountSlice.actions;
// console.log("this is logIn actions:", logIn)

export default accountSlice.reducer;
