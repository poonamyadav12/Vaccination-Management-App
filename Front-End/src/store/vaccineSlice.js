import { createSlice } from "@reduxjs/toolkit";
import { CreateVaccine } from "../services";

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
  },
  extraReducers: {
    [CreateVaccine.fulfilled]: (state, action) => {
      state.vaccine = action.payload;
      state.isSuccess = true;
    },
    [CreateVaccine.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const vaccineSliceActions = vaccineSlice.actions;
export const vaccineSliceReducers = vaccineSlice.reducer;
