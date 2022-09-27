import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { getUserDataJWTFetch, LogInFetch } from "../../Api/accountFetch";

export interface IAccountState {
    isLoggedIn: boolean | null;
    isAdmin: boolean;
    status: string;
    combineUserData: Array<ICombineUserDataState>;
    shoppingData: Array<object>;
    error: undefined | string;
}
export interface ICombineUserDataState {
    account_name: string;
    age_range: string | null;
    area: string | null;
    contact: string | null;
    created_at: string;
    default_contact: string;
    district: string | null;
    email: string;
    first_name: string | null;
    gender: string | null;
    icon: string | null;
    id: number | null;
    is_admin: boolean | null;
    last_login_at: string;
    last_name: string | null;
    learning_level: string | null;
    location: string | null;
    reason: string | null;
    slogan: string | null;
    updated_at: string;
    accumulation: number | null;
    date: string;
}
const AccountInitialState = {
    isLoggedIn: null,
    isAdmin: false,
    status: "",
    combineUserData: [],
    shoppingData: [],
    error: undefined,
} as IAccountState;

// const CombineUserData = {
//     account_name: "",
//     age_range: null,
//     area: null,
//     contact: null,
//     created_at: "",
//     default_contact: "",
//     district: null,
//     email: "",
//     first_name: null,
//     gender: null,
//     icon: null,
//     id: null,
//     is_admin: null,
//     last_login_at: "",
//     last_name: null,
//     learning_level: null,
//     location: null,
//     reason: null,
//     slogan: null,
//     updated_at: "",
// } as ICombineUserData;

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
                const identity = action.payload.body.combineUserData[0].is_admin;
                console.log("action.payload.body.userShoppingDataArr:", action.payload.body.userShoppingDataArr);
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
                    // console.log("combineUserData:", action.payload.body.combineUserData);
                    // console.log("userShoppingDataArr:", action.payload.body.userShoppingDataArr);
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

export const { logOut } = accountSlice.actions;
// console.log("this is logIn actions:", logIn)

export default accountSlice.reducer;
