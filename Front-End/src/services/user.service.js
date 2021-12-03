import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080";

export const CreateUser = createAsyncThunk(
    "user/create",
    (user, {dispatch, rejectWithValue}) =>
        axios.post(`${BASE_URL}/user`,
            user,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            })
            .then((r) => r.data) // Return a value synchronously using Async-await
            .catch((err) => {
                if (!err?.response?.data) {
                    throw err;
                }
                if (err.response.data?.BadRequest?.msg)
                    return rejectWithValue(err.response.data.BadRequest.msg);
                return rejectWithValue("Some error occured, please try again.");
            })
)
