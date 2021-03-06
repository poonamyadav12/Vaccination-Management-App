import {createSlice} from "@reduxjs/toolkit";
import {CreateVaccine, GetDueVaccines, GetVaccinesInfo} from "../services";

const vaccineSlice = createSlice({
    name: "vaccine",
    initialState: {},
    reducers: {
        setVaccine(state, action) {
            state.vaccine = action.payload;
            state.isSuccess = true;
        },
        setError(state, action) {
            state.error = action.payload;
            state.isSuccess = false;
        },
        setIsSuccess(state, action) {
            state.isSuccess = action.payload;
        },
        clearDueVaccines(state, action) {
            state.dueVaccines = null;
        },
        clearVaccineInfo(state, action) {
            state.vaccineInfo = null;
        },
    },
    extraReducers: {
        [CreateVaccine.fulfilled]: (state, action) => {
            state.vaccine = action.payload;
            state.isSuccess = true;
        },
        [CreateVaccine.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [GetDueVaccines.fulfilled]: (state, action) => {
            state.dueVaccines = action.payload;
            state.isSuccess = true;
        },
        [GetDueVaccines.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [GetVaccinesInfo.fulfilled]: (state, action) => {
            state.vaccineInfo = action.payload;
            state.vaccineInfoSuccess = true;
        },
        [GetVaccinesInfo.rejected]: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const vaccineSliceActions = vaccineSlice.actions;
export const vaccineSliceReducers = vaccineSlice.reducer;
