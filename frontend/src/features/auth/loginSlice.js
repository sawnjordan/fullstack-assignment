import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: "",
  isAuthenticated: false,
  error: "",
};
// Axios configuration with headers
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const data = {
      email: "",
      password: "",
    };
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw Error("Error Logging in:" + error.message);
  }
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
  },
});

export default loginSlice.reducer;
