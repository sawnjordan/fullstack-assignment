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
    "Content-Type": "multipart/form-data",
  },
};
export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/register",
      userData,
      config
    );
    return response.data;
  } catch (error) {
    throw Error("Error Logging in:" + error.message);
  }
});

export const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.isAuthenticated = false;
      state.error = action.error;
    });
  },
});

export default registerSlice.reducer;
