import {createSlice} from "@reduxjs/toolkit";
import {CreateAppointments, GetAppointments} from "../services";

const appointmentSlice = createSlice({
    name: 'appointmentSlice',
    initialState: {},
    extraReducers: {
        [CreateAppointments.fulfilled]: (state, action) => {
            state.isSuccess = true;
        },
        [CreateAppointments.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [GetAppointments.fulfilled]: (state, action) => {
            state.appointment = action.payload;
            state.isSuccess = true;
        },
        [GetAppointments.rejected]: (state, action) => {
            state.error = action.payload;
            state.isSuccess = false;
        },
    }
})

export const appointmentSliceActions = appointmentSlice.actions;
export const appointmentSliceReducers = appointmentSlice.reducer;