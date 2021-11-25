import { configureStore } from '@reduxjs/toolkit';
import { userSliceReducers } from './userSlice';

const store = configureStore({
    reducer: { userSlice: userSliceReducers }
})

export default store;