import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import gptReducer from './gptSlice';

export const appStore = configureStore({
    reducer:{
        user:userReducer,
        movie:movieReducer,
        gpt:gptReducer
    }
});