import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import {
    getPostDetailByPostIdFetch,
    getPostFetch,
    getSearchTagPostFetch,
} from "../../Api/platformFetch";

export interface PostState {
    account_name: string;
    contact: string | null;
    count: string;
    created_at: string;
    description: string | null;
    display_push: string;
    event_date: string | null;
    event_location: string | null;
    event_time: string | null;
    id: number | null;
    image: string[];
    is_event: boolean | null;
    is_ordinary: boolean | null;
    tag: string[];
    title: string | null;
    updated_at: string;
    icon: string | null;
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
    postDetail: PostState;
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

const PostStateInitialState = {
    account_name: "",
    contact: null,
    count: "",
    created_at: "",
    description: null,
    display_push: "",
    event_date: null,
    event_location: null,
    event_time: null,
    id: null,
    image: [],
    is_event: null,
    is_ordinary: null,
    tag: [],
    title: null,
    updated_at: "",
    icon: null,
};

PlatformInitialState = {
    list: [],
    currentSelect: 1,
    status: "",
    error: "",
    postDetail: PostStateInitialState,
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
            })
            .addCase(getPostDetailByPostIdFetch.pending, (state) => {
                const nextState = produce(PlatformInitialState, (draft) => {
                    draft.status = "loading";
                });
                state = nextState;
                return state;
            })
            .addCase(getPostDetailByPostIdFetch.fulfilled, (state, action) => {
                const postItems = action.payload.body;
                const nextState = produce(PlatformInitialState, (draft) => {
                    draft.status = "succeeded";
                    draft.postDetail = postItems;
                });
                state = nextState;

                return state;
            })
            .addCase(getPostDetailByPostIdFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            });
    },
});

export const { addPost, selectPost } = platformSlice.actions;
export default platformSlice.reducer;
