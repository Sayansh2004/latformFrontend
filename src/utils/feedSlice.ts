import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { feedData } from "@/Types/feedData";

const initialState:feedData[]=[]
const feedSLice=createSlice({
    name:"feed",
    initialState,
    reducers:{
        addFeed:(state,action:PayloadAction<feedData[]>)=>{
            return action.payload;
        },
        removeUser:(state,action:PayloadAction<string>)=>{
          return state.filter((req)=>req._id!==action.payload);
           
        }
    }
})

export const {addFeed,removeUser}=feedSLice.actions;
export default feedSLice.reducer;