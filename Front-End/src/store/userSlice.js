import {createSlice} from '@reduxjs/toolkit'
import {CreateUser, GetUser, GetUserReport} from "../services";


let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? {user} : {};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.isSuccess = true;
        },
        setError(state, action) {
            state.error = action.payload;
            state.isSuccess = false;
        },
        setIsSuccess(state, action) {
            state.isSuccess = action.payload;
        },
        clearUser(state, action) {
            state.user = null;
            localStorage.setItem('user', null);
            state.isSuccess = false;
        },
        setUserReportSuccess(state, action) {
            state.isUserReportSuccess = action.payload;
        },
        setUserReportError(state, action) {
            state.isUserReportError = action.payload;
        }
    },
    extraReducers: {
        [CreateUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.isSuccess = true;
        },
        [CreateUser.rejected]: (state, action) => {
            state.error = action.payload;
            localStorage.setItem('user', null);
        },
        [GetUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.isSuccess = true;
        },
        [GetUser.rejected]: (state, action) => {
            state.error = action.payload;
            localStorage.setItem('user', null);
        },
        [GetUserReport.fulfilled]: (state, action) => {
            state.userReport = action.payload;
            state.isUserReportSuccess = true;
        },
        [GetUserReport.rejected]: (state, action) => {
            state.isUserReportError = action.payload;
        },

    }

})

export const userSliceActions = userSlice.actions;
export const userSliceReducers = userSlice.reducer;