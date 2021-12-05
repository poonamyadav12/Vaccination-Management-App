import {configureStore} from '@reduxjs/toolkit';
import {userSliceReducers} from './userSlice';
import {clinicSliceReducers} from "./clinicSlice";

const store = configureStore({
    reducer: {userSlice: userSliceReducers, clinicSlice: clinicSliceReducers},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;