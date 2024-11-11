import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const apiClient = axios.create({
  baseURL,
});

export const patientProfile = createAsyncThunk(
  "patient/patientProfile",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/patient/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAppointment = createAsyncThunk(
  "patient/getAppoinment",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/patient/get-appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    loading: false,
    patient: {},
    appointments: [],
    error: [],
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.patient = {};
      state.error = [];
    },
    clearError: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(patientProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(patientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload;
      })
      .addCase(patientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = patientSlice.actions;
export default patientSlice.reducer;
