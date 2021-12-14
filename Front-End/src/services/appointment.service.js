import {createParamOnlyPostThunk} from "./thunkhelper";

export const CreateAppointments = createParamOnlyPostThunk("appointment/create", `/appointment/create`);