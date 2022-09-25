import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchFriends = createAsyncThunk('/friends/fetchFriends', async () => {
    const { data } = await axios.get('/friends')
    return data
})



const initialState = {
    friends: {
        items: [],
        status: 'loading'
    },
    
}

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: {
        // Get friends
        [fetchFriends.pending]: (state) => {
            state.friends.status = 'loading'
        },
        [fetchFriends.fulfilled]: (state, action) => {
            state.friends.items = action.payload
            state.friends.status = 'loaded'
        },
        [fetchFriends.rejected]: (state) => {
            state.friends.items = [];
            state.friends.status = 'error'
        },

     
       
    }
})

export const friendsReduser = friendsSlice.reducer;