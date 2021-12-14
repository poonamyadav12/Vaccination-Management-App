import {createPostThunk} from "./thunkhelper";

export const CreateVaccine = createPostThunk(
    "vaccine",
    `/vaccine`
);