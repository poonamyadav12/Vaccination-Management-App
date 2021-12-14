import {createGetThunk, createParamOnlyPostThunk} from "./thunkhelper";

export const CreateAppointments = createParamOnlyPostThunk("appointment/create", `/appointment/create`);
export const GetAppointments = createGetThunk("appointment/get", '/appointments/');