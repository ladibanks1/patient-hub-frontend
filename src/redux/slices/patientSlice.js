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

export const updateProfile = createAsyncThunk(
  "patient/updateProfile",
  async ({ data, token, id }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(
        `/patient/update-profile/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "patient/deleteProfile",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/patient/delete-profile/${id}`, {
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
    updateLoading: false,
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
    builder
      .addCase(updateProfile.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.patient = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteProfile.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.patient = action.payload;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = patientSlice.actions;
export default patientSlice.reducer;
