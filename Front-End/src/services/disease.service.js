import {createPostThunk} from "./thunkhelper";

export const CreateDisease = createPostThunk(
    "disease",
    `/disease`
);