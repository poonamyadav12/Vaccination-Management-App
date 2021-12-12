import {createSlice} from '@reduxjs/toolkit'
import {CreateUser, GetUser} from "../services";


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
    }

})

export const userSliceActions = userSlice.actions;
export const userSliceReducers = userSlice.reducer;