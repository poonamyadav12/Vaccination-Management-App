import {createSlice} from '@reduxjs/toolkit'
import {CreateClinic, GetClinic} from "../services";

const clinicSlice = createSlice({
    name: 'clinic',
    initialState: {},
    reducers: {
        setClinic(state, action) {
            state.clinic = action.payload;
            state.isSuccess = true;
        },
        setError(state, action) {
            state.error = action.payload;
            state.isSuccess = false;
        },
        setIsSuccess(state, action) {
            state.isSuccess = action.payload;
        },
    },
    extraReducers: {
        [CreateClinic.fulfilled]: (state, action) => {
            state.clinic = action.payload;
            state.isSuccess = true;
        },
        [CreateClinic.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [GetClinic.fulfilled]: (state, action) => {
            state.clinics = action.payload;
            state.isClinicSuccess = true;
        },
        [GetClinic.rejected]: (state, action) => {
            state.error = action.payload;
        },
    }

})

export const clinicSliceActions = clinicSlice.actions;
export const clinicSliceReducers = clinicSlice.reducer;