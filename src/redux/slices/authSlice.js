import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL,
});

// Register User MiddleWare
export const registerUser = createAsyncThunk(
  "authSlice/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/register-patient", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Register Hospital MiddleWare
export const registerHospital = createAsyncThunk(
  "authSlice/registerHospital",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/register-hospital", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login MiddleWare
export const login = createAsyncThunk(
  "authSlice/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial State
const initialState = {
  loading: false,
  token: sessionStorage.getItem("patientHub_token") || "",
  data: {},
  error: [],
  userType: "",
};

// Authentication Slice
const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.token = "";
      state.data = {};
      state.error = [];
      state.userType = "";
    },
    clearError: (state) => {
      state.loading = false;
      state.error = [];
    }
  },
  extraReducers: (builder) => {
    // Register User
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = [];
        state.data = {};
        sessionStorage.removeItem("patientHub_token");
        state.token = ""; // Clear the token
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        sessionStorage.setItem("patientHub_token", action.payload.token);
        state.token = action.payload.token;
        state.userType = action.payload.userType;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Register Hospital
    builder
      .addCase(registerHospital.pending, (state) => {
        state.loading = true;
        state.error = [];
        state.data = {};
        sessionStorage.removeItem("patientHub_token");
        state.token = ""; // Clear the token
      })
      .addCase(registerHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        sessionStorage.setItem("patientHub_token", action.payload.token);
        state.token = action.payload.token;
        state.error = [];
        state.userType = action.payload.userType;
      })
      .addCase(registerHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.data = {};
      });

    // Handle Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = [];
        state.data = {};
        state.userType = "";
        sessionStorage.removeItem("patientHub_token");
        state.token = ""; // Clear the token
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        sessionStorage.setItem("patientHub_token", action.payload.token);
        state.userType = action.payload.userType;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearState , clearError } = authSlice.actions;
export default authSlice.reducer;
