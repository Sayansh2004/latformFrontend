import { createSlice } from "@reduxjs/toolkit";
import type { ProfileData } from "@/Types/profileData";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState:ProfileData[]=[]

const ConnectionSlice=createSlice({
    name:"connection",
    initialState,
    reducers:{
        addConnections:(state,action:PayloadAction<ProfileData[]>)=>{
            return action.payload;
        }

    }
})

export const {addConnections}=ConnectionSlice.actions;
export default ConnectionSlice.reducer;