import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { getUserLikePostFetch, getUserPostFetch } from "../../Api/userFetch";

export interface IUserState {
    status: string;
    postData: Array<object>;
    likeData: Array<object>;
    error: undefined | string;
}
const UserInitialState = {
    status: "",
    postData: [],
    likeData: [],
    error: undefined,
} as IUserState;

const accountSlice = createSlice({
    name: "@User",
    initialState: UserInitialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUserPostFetch.pending, (state, action) => {
                const nextState = produce(UserInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(getUserPostFetch.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    const nextState = produce(UserInitialState, (draft) => {
                        draft.status = "succeeded";
                        draft.postData = action.payload.body;
                    });
                    state = nextState;
                } else {
                    const nextState = produce(UserInitialState, (draft) => {
                        draft.status = "succeeded";
                        draft.error = action.payload.message;
                    });
                    state = nextState;
                }
                return state;
            })
            .addCase(getUserPostFetch.rejected, (state, action) => {
                const nextState = produce(UserInitialState, (draft) => {
                    draft.status = "failed";
                });
                state = nextState;
                return state;
            })
            .addCase(getUserLikePostFetch.pending, (state, action) => {
                const nextState = produce(UserInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(getUserLikePostFetch.fulfilled, (state, action) => {
                if (action.payload.success === true) {
                    const nextState = produce(UserInitialState, (draft) => {
                        draft.status = "succeeded";
                        draft.likeData = action.payload.body;
                    });
                    state = nextState;
                } else {
                    const nextState = produce(UserInitialState, (draft) => {
                        draft.status = "succeeded";
                        draft.error = action.payload.message;
                    });
                    state = nextState;
                }
                return state;
            })
            .addCase(getUserLikePostFetch.rejected, (state, action) => {
                const nextState = produce(UserInitialState, (draft) => {
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
