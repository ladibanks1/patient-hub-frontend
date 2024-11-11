import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL,
});
export const hospitalProfile = createAsyncThunk(
  "hospital/hospitalProfile",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/hospital/profile/${id}`, {
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

export const hospitalAppointments = createAsyncThunk(
  "hospital/appointments",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/hospital/get-appointments/${id}`, {
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

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    loading: false,
    hospital: {},
    error: [],
    appointments: [],
    doctors: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hospitalProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(hospitalProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.hospital = action.payload;
      })
      .addCase(hospitalProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(hospitalAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(hospitalAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(hospitalAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = hospitalSlice.actions;
export default hospitalSlice.reducer;
