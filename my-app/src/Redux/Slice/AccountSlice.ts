import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { getUserDataJWTFetch, LogInFetch } from "../../Api/AccountFetch";

export interface IAccountState {
    isLoggedIn: boolean;
    isAdmin: boolean;
    status: string;
    combineUserData: Array<object>;
    shoppingData: Array<object>;
    error: undefined | string;
}
const AccountInitialState = {
    isLoggedIn: false,
    isAdmin: false,
    status: "",
    combineUserData: [],
    shoppingData:[],
    error: undefined,
} as IAccountState;

const accountSlice = createSlice({
    name: "@Account",
    initialState: AccountInitialState,
    reducers: {
        //logOut
        logOut(state, action: PayloadAction<IAccountState>) {
            state = AccountInitialState;
            window.localStorage.clear();
            return state;
        },

    },
    extraReducers(builder) {
        builder
            .addCase(LogInFetch.pending, (state, action) => {
                const nextState = produce(AccountInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(LogInFetch.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    const identity = action.payload.body.combineUserData[0].is_admin;
                    console.log("identity:",identity)
                    const nextState = produce(AccountInitialState, (draft) => {
                        const token = action.payload.body.token;
                        draft.isLoggedIn = true;
                        draft.isAdmin = identity;
                        draft.status = "succeeded";
                        draft.combineUserData = action.payload.body.combineUserData;
                        draft.shoppingData = action.payload.body.userShoppingDataArr;

                        window.localStorage.setItem("token", token);
                    });
                    state = nextState;
                } else {
                    const nextState = produce(AccountInitialState, (draft) => {
                        draft.status = "succeeded";
                        draft.error = action.payload.message;
                    });
                    state = nextState;
                }
                return state;
            })
            .addCase(LogInFetch.rejected, (state, action) => {
                const nextState = produce(AccountInitialState, (draft) => {
                    draft.status = "failed";
                });
                state = nextState;
                return state;
            })
            .addCase(getUserDataJWTFetch.pending, (state, action) => {
                const nextState = produce(AccountInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(getUserDataJWTFetch.fulfilled, (state, action) => {
                // need shopping cart data
                const nextState = produce(AccountInitialState, (draft) => {
                    console.log("combineUserData:",action.payload.body.combineUserData)
                    console.log("userShoppingDataArr:",action.payload.body.userShoppingDataArr)
                    draft.isLoggedIn = true;
                    draft.isAdmin = action.payload.body.combineUserData.is_admin;
                    draft.status = "succeeded";
                    draft.combineUserData.push(action.payload.body.combineUserData);
                    draft.shoppingData = action.payload.body.userShoppingDataArr;
                });
                state = nextState;
                return state;
            })
            .addCase(getUserDataJWTFetch.rejected, (state, action) => {
                const nextState = produce(AccountInitialState, (draft) => {
                    draft.status = "failed";
                });
                state = nextState;
                return state;
            });
    },
});

export const { logIn, logOut } = accountSlice.actions;
// console.log("this is logIn actions:", logIn)

export default accountSlice.reducer;
