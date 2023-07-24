import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
};
// Axios configuration with headers
const config = {
  headers: {
    "Content-Type": "application/json",
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
    if (error.response && error.response.data && error.response.data.msg) {
      const err = error.response.data.msg;
      const errorValues = Object.values(err);
      const errMsg = errorValues.join(", ");
      throw Error(errMsg);
    }
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
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.error;
    });
  },
});

export default registerSlice.reducer;
