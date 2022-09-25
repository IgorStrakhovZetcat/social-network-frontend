import { configureStore } from '@reduxjs/toolkit'
import {porstReduser} from './slices/posts'
import {authReducer} from './slices/auth'
import { commentsReduser } from './slices/comments';
import { friendsReduser } from './slices/friends';

const store = configureStore({
    reducer: {
        comments: commentsReduser,
        posts: porstReduser,
        auth: authReducer,
        friends: friendsReduser
        
    }
})

export default store;