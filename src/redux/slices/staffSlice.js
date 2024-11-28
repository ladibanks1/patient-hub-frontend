import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const baseURL = import.meta.env.VITE_BASE_URL;

// Api Client
const apiClient = axios.create({
  baseURL,
});

export const deleteStaff = createAsyncThunk(
  "staff/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete(`/staff/delete-profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editStaff = createAsyncThunk(
  `staff/edit-profile`,
  async ({ id, token, body }, { rejectWithValue }) => {
    try {
      const res = await apiClient.put(`/staff/update-profile/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const staffProfile = createAsyncThunk(
  "staff/profile",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/staff/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAppointments = createAsyncThunk(
  "staff/get-appointment",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await apiClient.get(`/staff/get-appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    loading: false,
    staff: {},
    message: "",
    error: [],
    appointments: [],
    appointLoading: false,
  },
  reducers: {
    clearState: (state) => {
      state.error = [];
      state.staff = {};
      state.message = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(staffProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(staffProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(staffProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStaff.fulfilled, (state) => {
        state.loading = false;
        state.staff = {};
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(editStaff.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(editStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAppointments.pending, (state) => {
        state.appointLoading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.appointLoading = false;
        state.appointments = action.payload.data.appointments;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.appointLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = staffSlice.actions;
export default staffSlice.reducer;
