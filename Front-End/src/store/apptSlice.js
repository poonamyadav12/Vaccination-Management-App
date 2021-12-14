import {createSlice} from "@reduxjs/toolkit";
import {CheckinAppointments, CreateAppointments, GetAppointments} from "../services";

const appointmentSlice = createSlice({
    name: 'appointmentSlice',
    initialState: {},
    reducers : {
        setCheckinSuccess(state, action) {
            state.checkinSuccess = action.payload;
        },
        setCreateAppointmentSuccess(state,action){
            state.createAppointmentSuccess = action.payload;
        }
    },
    extraReducers: {
        [CreateAppointments.fulfilled]: (state, action) => {
            state.createAppointmentSuccess = true;
        },
        [CreateAppointments.rejected]: (state, action) => {
            state.createAppointmentSuccess = false;
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
        [CheckinAppointments.fulfilled]: (state, action) => {
            // state.appointment = action.payload;
            state.checkinSuccess = true;
        },
        [CheckinAppointments.rejected]: (state, action) => {
            state.error = action.payload;
            state.checkinSuccess = false;
        },
    }
})

export const appointmentSliceActions = appointmentSlice.actions;
export const appointmentSliceReducers = appointmentSlice.reducer;