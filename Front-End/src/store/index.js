import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducers } from "./userSlice";
import { clinicSliceReducers } from "./clinicSlice";
import { diseaseSliceReducers } from "./diseaseSlice";
import { vaccineSliceReducers } from "./vaccineSlice";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { timeSliceReducers } from "./timeSlice";
import { slotSliceReducers } from "./slotSlice";

const store = configureStore({
  reducer: {
    firebaseReducer,
    firestoreReducer,
    userSlice: userSliceReducers,
    clinicSlice: clinicSliceReducers,
    diseaseSlice: diseaseSliceReducers,
    vaccineSlice: vaccineSliceReducers,
    timeSlice: timeSliceReducers,
    slotSlice: slotSliceReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
