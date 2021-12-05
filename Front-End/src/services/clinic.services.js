import {createPostThunk} from "./thunkhelper";

export const CreateClinic = createPostThunk(
    "clinic/create",
    `/clinic/create`
);
