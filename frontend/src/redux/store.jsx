import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import adminSlice from "./ownerSlice"
export const store = configureStore({
    reducer:{
        user: userSlice,
        admin:adminSlice,
    },
     devTools: true, 
})