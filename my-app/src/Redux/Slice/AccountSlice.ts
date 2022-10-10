import { createSlice, isAllOf, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { getUserDataJWTFetch, LogInFetch } from "../../Api/accountFetch";

export interface IAccountState {
  isLoggedIn: boolean | null;
  isAdmin: boolean;
  status: "" | "loading" | "succeeded" | "failed";
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
    builder.addMatcher(
      isAnyOf(LogInFetch.pending, getUserDataJWTFetch.pending),
      (state) => {
        state.status = "loading";
      }
    );
    builder
      .addCase(LogInFetch.fulfilled, (state, action) => {
        const identity = action.payload.body.combineUserData[0].is_admin;
        const token = action.payload.body.token;
        state.isLoggedIn = true;
        state.isAdmin = identity!;
        state.status = "succeeded";
        state.combineUserData = action.payload.body.combineUserData;
        state.shoppingData = action.payload.body.userShoppingDataArr;

        window.localStorage.setItem("token", token);
      })
      .addCase(LogInFetch.rejected, (state, action) => {
        const nextState = produce(AccountInitialState, (draft) => {
          draft.status = "failed";
        });
        state = nextState;
        return state;
      })
      .addCase(getUserDataJWTFetch.fulfilled, (state, action) => {
        // need shopping cart data
        // action.meta.arg.token
        const nextState = produce(AccountInitialState, (draft) => {
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
        console.log("reject");
        const nextState = produce(AccountInitialState, (draft) => {
          draft.status = "failed";
          draft.isLoggedIn = false;
        });
        state = nextState;
        return state;
      });
  },
});

export const { logOut } = accountSlice.actions;
// console.log("this is logIn actions:", logIn)

export default accountSlice.reducer;
