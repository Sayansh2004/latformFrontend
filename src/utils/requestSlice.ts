import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RequestData } from "@/Types/requestData";

const initialState:RequestData[]=[]

const requestSlice=createSlice({
    name:"request",
    initialState,
    reducers:{
        addRequests:(state,action:PayloadAction<RequestData[]>)=>{
            return action.payload;
        },
        removeRequests:(state,action:PayloadAction<string>)=>{
            return state.filter((req)=>req._id!==action.payload);
        }
    }
})

export const{addRequests,removeRequests}=requestSlice.actions;
export default requestSlice.reducer;