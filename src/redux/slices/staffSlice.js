import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const baseURL = import.meta.env.VITE_BASE_URL;

// Api Client
const apiClient = axios.create({
  baseURL,
});

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    loading: false,
    staff: {},
    error: [],
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default staffSlice.reducer;
