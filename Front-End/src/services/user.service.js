import {createGetThunk, createPostThunk} from "./thunkhelper";

export const CreateUser = createPostThunk("user/create", `/user`);
export const GetUser = createGetThunk("user/get",`/user/`);
export const GetUserReport = createGetThunk("user/getReport",`/user/`);