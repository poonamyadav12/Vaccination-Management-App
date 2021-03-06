import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export function createPostThunk(type, url) {
    return createAsyncThunk(
        type,
        (data, {dispatch, rejectWithValue}) =>
            axios.post(url,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then((r) => r.data) // Return a value synchronously using Async-await
                .catch(errorHandler(rejectWithValue)));
}

export function createParamOnlyPostThunk(type, url) {
    return createAsyncThunk(
        type,
        (urlSuffix, {dispatch, rejectWithValue}) =>
            axios.post(url + urlSuffix,
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                })
                .then((r) => r.data) // Return a value synchronously using Async-await
                .catch(errorHandler(rejectWithValue)));
}

export function createGetThunk(type, url) {
    return createAsyncThunk(
        type,
        (urlSuffix, {dispatch, rejectWithValue}) =>
            axios.get(url + urlSuffix,
                {
                    headers: {
                        "Accept": "application/json",
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then((r) => r.data) // Return a value synchronously using Async-await
                .catch(errorHandler(rejectWithValue)));
}

function errorHandler(rejectWithValue) {
  return (err) => {
    if (!err?.response?.data) {
      throw err;
    }
    if (err.response.data?.BadRequest?.msg)
      return rejectWithValue(err.response.data.BadRequest.msg);
    return rejectWithValue("Some error occured, please try again.");
  };
}

export function createNewGetThunk(type, url) {
  return createAsyncThunk(type, (urlSuffix, { dispatch, rejectWithValue }) =>
    axios
      .get(url + (urlSuffix ? urlSuffix : ""), {
        headers: {
          Accept: "application/json",
        },
      })
      .then((r) => r.data) // Return a value synchronously using Async-await
      .catch(errorHandler(rejectWithValue))
  );
}
