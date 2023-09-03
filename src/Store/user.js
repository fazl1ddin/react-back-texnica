import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../Config/api";
import { notification } from "antd";
import Cookies from "js-cookie";

export const UserLogin = createAsyncThunk(
    'UserLogin',
    async (data, { rejectWithValue }) => {
        try {
            const response = await instance({
                url: 'login',
                method: 'POST',
                data: data
            });
            return {
                data: response.data,
            };
        } catch (error) {
            return rejectWithValue({
                data: error.response.data,
                status: error.response.status
            });
        }
    }
)

export const UserMe = createAsyncThunk(
    'userMe',
    async (data, { rejectWithValue }) => {
        try {
            const response = await instance({
                url: 'login',
                method: 'get'
            })
            return {
                data: response.data
            }
        } catch (error) {
            return rejectWithValue({
                data: error.response.data,
                status: error.response.status
            });
        }
    }
)

export const user = createSlice({
    name: 'user',
    initialState: {
        user: undefined,
        loading: false
    },
    reducers: {
        setUser(state, action){
            state.user = action.payload
        },
        setUserLoading(state, action){
            state.loading = action.payload
        }
    },
    extraReducers: build => {
        build
            .addCase(UserLogin.pending, (state) => {
                state.loading = true
            })
            .addCase(UserLogin.fulfilled, (state, { payload: { data: {data, success} } }) => {
                state.loading = false
                notification.success({
                    message: data
                })
                state.user = user
            })
            .addCase(UserLogin.rejected, (state, { payload: { data: {data, success}, status } }) => {
                state.loading = false
                notification.error({
                    message: data
                })
            })
            .addCase(UserMe.pending, (state) => {
                state.loading = true
            })
            .addCase(UserMe.fulfilled, (state, { payload: { data, token } }) => {
                state.loading = false
                state.user = data
            })
            .addCase(UserMe.rejected, (state, { payload: { data: {data, success}, status: statusCode } }) => {
                state.loading = false
                notification.error({
                    message: data
                })
                if (success === 0 || statusCode === 401) Cookies.remove('token')
                
            })
    }
})

export const { setUser, setUserLoading } = user.actions