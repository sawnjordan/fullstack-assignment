import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: "",
  isAuthenticated: false,
  error: null,
};
// Axios configuration with headers
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const credentials = {
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        credentials,
        config
      );
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.response
      ) {
        // Extract the error message from the response and throw a new error with it
        throw Error(error.response.data.response);
      } else {
        // If there's no specific error message in the response, re-throw the original error
        throw error;
      }
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.error;
    });
  },
});

export default loginSlice.reducer;
