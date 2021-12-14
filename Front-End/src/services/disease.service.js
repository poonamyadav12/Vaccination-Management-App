import { createPostThunk, createNewGetThunk } from "./thunkhelper";

export const CreateDisease = createPostThunk("disease", `/disease`);

export const GetDisease = createNewGetThunk("disease/get", `/disease/`);