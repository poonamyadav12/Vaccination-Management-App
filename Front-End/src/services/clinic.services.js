import {createPostThunk} from "./thunkhelper";

const BASE_URL = "http://localhost:8080";

export const CreateClinic = createPostThunk(
    "clinic/create",
    `/clinic/create`
);
