import {configureStore} from '@reduxjs/toolkit';
import {userSliceReducers} from './userSlice';

const store = configureStore({
    reducer: {userSlice: userSliceReducers},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;