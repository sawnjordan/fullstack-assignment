import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState from "../initialState";
import { UPDATE_USER_STATE } from "./userActionTypes";

// Axios configuration with headers
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
        throw Error(error.response.data.response);
      } else {
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
    builder.addCase(UPDATE_USER_STATE, (state, action) => {
      state.loading = action.payload.loading;
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.error = action.payload.error;
    });
  },
});

export default loginSlice.reducer;
