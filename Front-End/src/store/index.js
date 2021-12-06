import {configureStore} from '@reduxjs/toolkit';
import {userSliceReducers} from './userSlice';
import {clinicSliceReducers} from "./clinicSlice";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

const store = configureStore({
    reducer: {
        firebaseReducer,
        firestoreReducer,
        userSlice: userSliceReducers,
        clinicSlice: clinicSliceReducers,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;