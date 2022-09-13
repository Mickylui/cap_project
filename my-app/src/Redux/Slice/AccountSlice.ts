import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { LogInFetch } from "../../Api/AccountFetch";

export interface IAccountState {
    token: string;
    isLoggedIn: boolean;
    status: string;
    userData: Array<object>;
    error: undefined | string;
}
const AccountInitialState = {
    token: "",
    isLoggedIn: false,
    status: "",
    userData:[],
    error: undefined,
} as IAccountState;

const accountSlice = createSlice({
    name: "Account",
    initialState: AccountInitialState,
    reducers: {
        //logIN
        logIn(state, action: PayloadAction<IAccountState>) {
            // console.log("this is state:",current(state))
            // state.token.push(action.payload);
        },
        //logOut
        logOut(state, action: PayloadAction<IAccountState>) {
            state.isLoggedIn = false;
            state.token = "";
        },

        //signUp
        signUp(state, action: PayloadAction<IAccountState>) {
            // state.error=action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(LogInFetch.pending, (state, action) => {
                const nextState = produce(AccountInitialState, (draft) => {
                    draft.token = "";
                    draft.isLoggedIn = false;
                    draft.status = "loading";
                    draft.userData = [];
                    draft.error = undefined;
                });
                state = nextState;
                console.log("nextState:", state.isLoggedIn);
                return state;
            })
            .addCase(LogInFetch.fulfilled, (state, action) => {
                if(action.payload.success === true){
                    const nextState = produce(AccountInitialState, (draft) => {
                        draft.token = action.payload.body.token
                        draft.isLoggedIn = true;
                        draft.status = "succeeded";
                        draft.userData.push(action.payload.body.userData)
                        draft.error = undefined;
                    });
                    state = nextState;
                }else{
                    const nextState = produce(AccountInitialState, (draft) => {
                        draft.token = "";
                        draft.isLoggedIn = false;
                        draft.status = "succeeded";
                        draft.userData = [];
                        draft.error = action.payload.message;
                        ;
                    });
                    state = nextState;
                }
                return state;
            })
            .addCase(LogInFetch.rejected, (state, action) => {
                const nextState = produce(AccountInitialState, (draft) => {
                    draft.token = "";
                    draft.isLoggedIn = false;
                    draft.status = "failed";
                    draft.userData = [];
                    draft.error = undefined;
                });
                // console.log("nextState:", state.isLoggedIn);
                state = nextState;
                return state;
            });
    },
});

export const { logIn, logOut, signUp } = accountSlice.actions;
// console.log("this is logIn actions:", logIn)

export default accountSlice.reducer;
