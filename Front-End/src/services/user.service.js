import {createPostThunk} from "./thunkhelper";

export const CreateUser = createPostThunk("user/create", `/user`);
