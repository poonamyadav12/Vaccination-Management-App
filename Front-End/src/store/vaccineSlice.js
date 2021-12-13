import {createSlice} from "@reduxjs/toolkit";
import {GetDueVaccines} from "../services";

const vaccineSlice = createSlice({
    name: 'appointmentSlot',
    initialState: {},
    extraReducers: {
        [GetDueVaccines.fulfilled]: (state, action) => {
            state.dueVaccines = action.payload;
            state.isSuccess = true;
        },
        [GetDueVaccines.rejected]: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const vaccineSliceActions = vaccineSlice.actions;
export const vaccineSliceReducers = vaccineSlice.reducer;