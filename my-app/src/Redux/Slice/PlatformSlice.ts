import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import {
    getAdminPostFetch,
    getPostDetailByPostIdFetch,
    getSearchContentPostFetch,
    getSearchTagPostFetch,
    getUserPostFetch,
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
    is_liked_by_user: Array<boolean>;
    user_id: number | null;
    is_dislike: Array<boolean>;
}

export interface IPlatformState {
    userList: PostState[];
    adminList: PostState[];
    searchList: PostState[];
    currentSelect: number;
    status: string;
    pageNum: number;
    error: string;
    postDetail: PostState;
}

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
    is_liked_by_user: [],
    user_id: null,
    is_dislike: [],
};

PlatformInitialState = {
    userList: [],
    adminList: [],
    searchList: [],
    currentSelect: 1,
    status: "",
    error: "",
    pageNum: 1,
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
            .addCase(getUserPostFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUserPostFetch.fulfilled, (state, action) => {
                state.searchList = [];
                state.status = "succeeded";
                console.log(action.payload.body);
                state.userList = action.meta.arg.init
                    ? action.payload.body
                    : [...state.userList].concat([...action.payload.body]);
                console.log("pageNum:", state.pageNum);
                state.pageNum = action.meta.arg.init ? 1 : state.pageNum + 1;
            })
            .addCase(getUserPostFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            })
            .addCase(getAdminPostFetch.pending, (state) => {
                state.status = "loading"; 
            })
            .addCase(getAdminPostFetch.fulfilled, (state, action) => {
                const postItems: PostState[] = action.payload.body;
                state.status = "succeeded";
                state.searchList = [];
                state.adminList = postItems;
            })
            .addCase(getAdminPostFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            })

            .addCase(getSearchTagPostFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getSearchTagPostFetch.fulfilled, (state, action) => {
                const postItems = action.payload.body;
                state.status = "succeeded";
                state.adminList = [];
                state.userList = [];
                state.searchList = postItems;
                state.pageNum = 1;
            })
            .addCase(getSearchTagPostFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            })
            .addCase(getSearchContentPostFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getSearchContentPostFetch.fulfilled, (state, action) => {
                const postItems = action.payload.body;
                // console.log("this is content:", postItems);
                state.status = "succeeded";
                state.adminList = [];
                state.userList = [];
                state.searchList = postItems;
                state.pageNum = 1;
            })
            .addCase(getSearchContentPostFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            })
            .addCase(getPostDetailByPostIdFetch.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getPostDetailByPostIdFetch.fulfilled, (state, action) => {
                const postItems = action.payload.body;
                state.status = "succeeded";
                state.postDetail = postItems;
            })
            .addCase(getPostDetailByPostIdFetch.rejected, (state, action) => {
                console.log(action.payload?.error);
            });
    },
});

export const { addPost, selectPost } = platformSlice.actions;
export default platformSlice.reducer;
