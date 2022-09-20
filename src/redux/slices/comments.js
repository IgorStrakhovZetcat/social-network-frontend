import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"


export const fetchComments = createAsyncThunk('/comments/fetchComments', async () => {
    const { data } = await axios.get('/comments')
    return data
})

export const fetchRemoveComment = createAsyncThunk('/comments/fetchRemoveComment', async (id) => {
    await axios.delete(`/comments/${id}`)
})

const initialState = {
    comments: {
        items: [],
        status: 'loading'
    }
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        // Get posts
        [fetchComments.pending]: (state) => {
            state.comments.status = 'loading'
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded'
        },
        [fetchComments.rejected]: (state) => {
            state.comments.items = [];
            state.comments.status = 'error'
        },


        // Remove post
        [fetchRemoveComment.pending]: (state, actoin) => {
            state.comments.items = state.comments.items.filter(obj => obj._id !== actoin.meta.arg)
        },
    }
})

export const commentsReduser = commentSlice.reducer;