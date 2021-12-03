import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080";

export const CreateClinic = createAsyncThunk(
    "clinic/create",
    async (clinic) => (await axios.post(`${BASE_URL}/clinic/create`, clinic)).data
);
