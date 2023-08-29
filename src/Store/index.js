import { configureStore } from "@reduxjs/toolkit";
import { user } from "./user";
import { statistics } from "./statistics";


export const storeUser = configureStore({
    reducer: user.reducer
})

export const storeStatistics = configureStore({
    reducer: statistics.reducer
})