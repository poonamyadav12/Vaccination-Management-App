import {createPostThunk, createGetThunk} from "./thunkhelper";

export const CreateVaccine = createPostThunk(
    "vaccine",
    `/vaccine`
);

export const GetDueVaccines = createGetThunk("vaccine/due",`/vaccine/due/`)
export const GetVaccinesInfo = createGetThunk("vaccine/allInfo",`/vaccine/allInfo/`)
