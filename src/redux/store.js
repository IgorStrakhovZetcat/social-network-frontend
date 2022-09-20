import { configureStore } from '@reduxjs/toolkit'
import {porstReduser} from './slices/posts'
import {authReducer} from './slices/auth'
import { commentsReduser } from './slices/comments';

const store = configureStore({
    reducer: {
        comments: commentsReduser,
        posts: porstReduser,
        auth: authReducer
        
    }
})

export default store;