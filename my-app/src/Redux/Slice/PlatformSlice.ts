import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PostState {
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
    loading: boolean;
}

type NewPostState = {
    id: number;
    title: string;
    description: string;
    event_date: Date | null;
    event_time: string | null;
    event_location: string | null;
}

export type NewPlatformState = {
    list: NewPostState[];
    currentSelect: number;
    loading:boolean;
}

export type Error = {
    error:string
  }
  
  export type Carriage = {
    isSuccess:boolean;
    body: any;
  }

let PlatformInitialState: NewPlatformState;

PlatformInitialState = {
    list: [],
    currentSelect: 1,
    loading: true,
} 



export const getPOSTS = createAsyncThunk<Carriage,any,{rejectValue:Error}>(
    "@posts/get",
    async(_,thunkAPI)=>{
    try {
        const res = await fetch("http://localhost:8080/posts");
        const posts = await res.json();
        return posts;
    } catch {
        return thunkAPI.rejectWithValue({error:"Cannot get POSTS."} as Error);
    }
  });

const platformSlice = createSlice({
    name: "posts",
    initialState: PlatformInitialState,
    reducers: {
        addPost(state, action: PayloadAction<NewPostState>) {
            state.list.unshift(action.payload)
        },
        selectPost(state, action: PayloadAction<number>) {
            state.currentSelect = action.payload;
        },
        
    },
    extraReducers(builder) {
        builder
        .addCase(getPOSTS.pending,(state)=>{
            state.loading = true;
          })
          .addCase(getPOSTS.fulfilled,(state,action)=>{
            state.loading = false;
            const result = action.payload;
      
            console.log(result.body)
            state.list = result.body
          })
          .addCase(getPOSTS.rejected,(state,action)=>{
            console.log(action.payload?.error)
          })
    }
});

export const {
    addPost,
    selectPost,
} = platformSlice.actions;
export default platformSlice.reducer;


