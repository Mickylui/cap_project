import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { getPostFetch, getSearchTagPostFetch } from "../../Api/PlatformFetch";

export interface PostState {
    // map(arg0: (postItem: any) => void): import("react").ReactNode;
    id: number;
    title: string;
    description: string;
    tag: string;
    event_date: Date | null;
    event_time: string | null;
    event_location: string | null;
    user: string;
    contact: string;
}

// export interface PostView {
//     postList: [{}],
//     postViews:[{}]
// }

export interface IPlatformState {
    list: PostState[];
    currentSelect: number;
    status: string;
    error: string;
}

// type NewPostState = {
//     id: number;
//     title: string;
//     description: string;
//     event_date: Date | null;
//     event_time: string | null;
//     event_location: string | null;
// }

// export type NewPlatformState = {
//     list: PostState[];
//     currentSelect: number;
//     loading:boolean;
// }

export type Error = {
    error: string;
};

let PlatformInitialState: IPlatformState;

PlatformInitialState = {
    list: [],
    currentSelect: 1,
    status: "",
    error: "",
};

const platformSlice = createSlice({
    name: "@Posts",
    initialState: PlatformInitialState,
    reducers: {
        addPost(state, action: PayloadAction<IPlatformState>) {
            // state.list.unshift(action.payload)
        },
        selectPost(state, action: PayloadAction<number>) {
            state.currentSelect = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getPostFetch.pending, (state) => {
                const nextState = produce(PlatformInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(getPostFetch.fulfilled, (state, action) => {
                const postItems = action.payload.body;
                const nextState = produce(PlatformInitialState, (draft) => {
                    draft.status = "succeeded";
                    draft.list = postItems;
                });
                state = nextState;

                return state;
            })
            .addCase(getPostFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            })
            .addCase(getSearchTagPostFetch.pending, (state) => {
                const nextState = produce(PlatformInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(getSearchTagPostFetch.fulfilled, (state, action) => {
                const postItems = action.payload.body;
                const nextState = produce(PlatformInitialState, (draft) => {
                    draft.status = "succeeded";
                    draft.list = postItems;
                });
                state = nextState;

                return state;
            })
            .addCase(getSearchTagPostFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            });
    },
});

export const { addPost, selectPost } = platformSlice.actions;
export default platformSlice.reducer;
