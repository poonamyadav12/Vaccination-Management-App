import {createGetThunk, createParamOnlyPostThunk} from "./thunkhelper";

export const CreateAppointments = createParamOnlyPostThunk("appointment/create", `/appointment/create`);
export const CheckinAppointments = createParamOnlyPostThunk("appointment/checkin", `/appointment/checkin`);
export const GetAppointments = createGetThunk("appointment/get", '/appointments/');