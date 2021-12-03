import {createSlice} from '@reduxjs/toolkit'
import {CreateUser} from "../services";

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isSuccess = true;
        },
        setError(state, action) {
            state.error = action.payload;
            state.isSuccess = false;
        },
    },
    extraReducers: {
        [CreateUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isSuccess = true;
        },
        [CreateUser.rejected]: (state, action) => {
            state.error = action.payload;
        },
    }

})

export const userSliceActions = userSlice.actions;
export const userSliceReducers = userSlice.reducer;