import {createSlice} from "@reduxjs/toolkit";
import {GetSlots} from "../services";

const CURRENT_TIME = 'currentTime';
const currentTime = localStorage.getItem(CURRENT_TIME);
const initialState = {time: currentTime ? new Date(currentTime) : new Date()}

const slotSlice = createSlice({
    name: 'appointmentSlot',
    initialState: initialState,
    extraReducers:{
        [GetSlots.fulfilled]: (state, action) => {
            state.slots = action.payload;
            state.isSuccess = true;
        },
        [GetSlots.rejected]: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const slotSliceActions = slotSlice.actions;
export const slotSliceReducers = slotSlice.reducer;