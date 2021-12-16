import {createGetThunk, createPostThunk} from "./thunkhelper";

export const CreateClinic = createPostThunk(
    "clinic/create",
    `/clinic/create`
);

export const GetClinic = createGetThunk("clinic/get", '/clinic');
