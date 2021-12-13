import {createSlice} from "@reduxjs/toolkit";
import {CreateAppointments, GetDueVaccines} from "../services";

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
    }
})

export const appointmentSliceActions = appointmentSlice.actions;
export const appointmentSliceReducers = appointmentSlice.reducer;