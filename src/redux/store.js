import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import patientReducer from "./slices/patientSlice";
import hospitalReducer from "./slices/hospitalSlice";
import staffReducer from "./slices/staffSlice";
import appointmentReducer from "./slices/appointmentSlice"

const store = configureStore({
  reducer: {
    auth: authReducer, //Authentication MiddleWare
    patient: patientReducer, //Patient MiddleWare
    hospital: hospitalReducer,
    staff: staffReducer,
    appointment: appointmentReducer
  },
});

export default store;
