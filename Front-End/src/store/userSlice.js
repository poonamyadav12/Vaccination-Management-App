import { createSlice } from '@reduxjs/toolkit'

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
    phonenumber: '',
    gender: '',
    password: '',
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        setEmail(state, action) {
            state.email = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
        setFirstName(state, action) {
            state.firstname = action.payload
        },
        setMiddleName(state, action) {
            state.middlename = action.payload
        },
        setLastName(state, action) {
            state.lastname = action.payload
        },
        setDob(state, action) {
            state.dob = action.payload
        },
        setStreetDetails(state, action) {
            state.streetdetails = action.payload
        },
        setCity(state, action) {
            state.city = action.payload
        },
        setState(state, action) {
            state.state = action.payload
        },
        setZipCode(state, action) {
            state.zipcode = action.payload
        },
        setPhoneNumber(state, action) {
            state.phonenumber = action.payload
        },
        setGender(state, action) {
            state.gender = action.payload
        },
    }
})

export const userSliceActions = userSlice.actions;
export const userSliceReducers = userSlice.reducer;