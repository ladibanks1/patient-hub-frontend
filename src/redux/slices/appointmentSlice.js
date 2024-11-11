import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL,
});

const appoinmentSlice = createSlice({
  name: "appointment",
  initialState: {
    loading: false,
    appointments: {},
    error: [],
  },
  extraReducers: (builder) => {
  }
});



export default appoinmentSlice.reducer
