import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const CURRENT_TIME = 'currentTime';
const currentTime = localStorage.getItem(CURRENT_TIME);
const initialState = {time: currentTime ? new Date(currentTime) : new Date()}

const timeSlice = createSlice({
    name: 'time',
    initialState: initialState,
    reducers: {
        setCurrentTime(state, action) {
            state.time = action.payload;
            localStorage.setItem(CURRENT_TIME, action.payload.toString());
            axios.defaults.params['time'] = action.payload;
        },
        clearTime(state, action) {
            state.time = null;
            axios.defaults.params['time'] = new Date();
            localStorage.setItem(CURRENT_TIME, null);
        }
    },
})

export const timeSliceActions = timeSlice.actions;
export const timeSliceReducers = timeSlice.reducer;