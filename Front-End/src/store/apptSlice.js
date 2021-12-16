import {createSlice} from "@reduxjs/toolkit";
import {
    CheckinAppointments,
    CreateAppointments, DeleteAppointments,
    GetAppointments,
    GetClinicReport,
    GetUserReport,
    UpdateAppointments
} from "../services";

const appointmentSlice = createSlice({
    name: 'appointmentSlice',
    initialState: {},
    reducers: {
        setCheckinSuccess(state, action) {
            state.checkinSuccess = action.payload;
        },
        setCreateAppointmentSuccess(state, action) {
            state.createAppointmentSuccess = action.payload;
        },
        setUpdateAppointmentSuccess(state, action) {
            state.updateAppointmentSuccess = action.payload;
        },
        setDeleteAppointmentSuccess(state, action) {
            state.deleteAppointmentSuccess = action.payload;
        },
        setSystemReportSuccess(state, action) {
            state.isSystemReportSuccess = action.payload;
        },
        setSystemReportError(state, action) {
            state.isSystemReportError = action.payload;
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
        [UpdateAppointments.fulfilled]: (state, action) => {
            state.updateAppointmentSuccess = true;
        },
        [UpdateAppointments.rejected]: (state, action) => {
            state.updateAppointmentSuccess = false;
            state.error = action.payload;
        },
        [DeleteAppointments.fulfilled]: (state, action) => {
            state.deleteAppointmentSuccess = true;
        },
        [DeleteAppointments.rejected]: (state, action) => {
            state.deleteAppointmentSuccess = false;
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
        [GetClinicReport.fulfilled]: (state, action) => {
            state.systemReport = action.payload;
            state.isSystemReportSuccess = true;
        },
        [GetClinicReport.rejected]: (state, action) => {
            state.isSystemReportError = action.payload;
        },
    }
})

export const appointmentSliceActions = appointmentSlice.actions;
export const appointmentSliceReducers = appointmentSlice.reducer;