import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080";

export const CreateUser = createAsyncThunk(
    "user/create",
    async (user) => (await axios.post(`${BASE_URL}/user`, user)).data
);