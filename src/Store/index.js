import { configureStore } from "@reduxjs/toolkit";
import { user } from "./user";


export const storeUser = configureStore({
    reducer: user.reducer
})