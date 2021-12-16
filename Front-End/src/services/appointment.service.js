import {createGetThunk, createParamOnlyPostThunk} from "./thunkhelper";

export const CreateAppointments = createParamOnlyPostThunk("appointment/create", `/appointment/create`);
export const DeleteAppointments = createParamOnlyPostThunk("appointment/delete", `/appointment/delete`);
export const UpdateAppointments = createParamOnlyPostThunk("appointment/update", `/appointment/update`);
export const CheckinAppointments = createParamOnlyPostThunk("appointment/checkin", `/appointment/checkin`);
export const GetAppointments = createGetThunk("appointment/get", '/appointments/');
export const GetClinicReport = createGetThunk("clinicReport", '/clinicReport/')