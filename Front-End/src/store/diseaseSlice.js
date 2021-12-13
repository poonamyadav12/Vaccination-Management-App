import { createSlice } from "@reduxjs/toolkit";
import { CreateDisease } from "../services";

const diseaseSlice = createSlice({
  name: "disease",
  initialState: {},
  reducers: {
    setDisease(state, action) {
      state.disease = action.payload;
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
    [CreateDisease.fulfilled]: (state, action) => {
      state.disease = action.payload;
      state.isSuccess = true;
    },
    [CreateDisease.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const diseaseSliceActions = diseaseSlice.actions;
export const diseaseSliceReducers = diseaseSlice.reducer;
