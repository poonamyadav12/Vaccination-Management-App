import {createSlice} from '@reduxjs/toolkit'
import {CreateUser} from "../services";

const initialState = {
    email: '',
    firstname: '',
    middlename: '',
    lastname: '',
    dob: new Date().toISOString(),
    streetdetails: '',
    city: '',
    state: '',
    zipcode: '',
    mrn: '',
    gender: '',
    password: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        }
    },
    extraReducers: {
        [CreateUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.success = true;
        },
    }
})

export const userSliceActions = userSlice.actions;
export const userSliceReducers = userSlice.reducer;