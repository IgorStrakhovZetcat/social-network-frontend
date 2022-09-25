import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"


export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me')
    return data
})

export const fetchGetUsers = createAsyncThunk('users/fetchGetUsers', async () => {
    const { data } = await axios.get('/users')
    return data
})

const initialState = {
    data: null,
    status: 'loading',
    users: {
        items: [],
        status: 'loading'
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {

        //Login
        [fetchAuth.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, actoin) => {
            state.status = 'loaded'
            state.data = actoin.payload
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },

        //Get me
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, actoin) => {
            state.status = 'loaded'
            state.data = actoin.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },

        //Register user
        [fetchRegister.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegister.fulfilled]: (state, actoin) => {
            state.status = 'loaded'
            state.data = actoin.payload
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },

        //Get all users
        [fetchGetUsers.pending]: (state) => {
            state.users.status = 'loading'
            state.users.items = null
        },
        [fetchGetUsers.fulfilled]: (state, actoin) => {
            state.users.status = 'loaded'
            state.users.items = actoin.payload
        },
        [fetchGetUsers.rejected]: (state) => {
            state.users.status = 'error'
            state.users.items = null
        },
    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions