import {configureStore} from '@reduxjs/toolkit';
import {userSliceReducers} from './userSlice';
import {clinicSliceReducers} from "./clinicSlice";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {timeSliceReducers} from "./timeSlice";

const store = configureStore({
    reducer: {
        firebaseReducer,
        firestoreReducer,
        userSlice: userSliceReducers,
        clinicSlice: clinicSliceReducers,
        timeSlice: timeSliceReducers,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;