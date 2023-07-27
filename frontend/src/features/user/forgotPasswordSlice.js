import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UPDATE_USER_STATE } from "../auth/userActionTypes";

const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const CLEAR_MESSAGE = "CLEAR_MESSAGE";

const initialState = {};

// Axios configuration with headers
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/forgot-password",
        { email },
        config
      );
      return response.data;
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.data && error.response.data.msg) {
        throw Error(error.response.data.msg);
      } else {
        throw error;
      }
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, credentialsData }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/reset-password/${token}`,
        credentialsData,
        config
      );
      return response.data;
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.data && error.response.data.msg) {
        throw Error(error.response.data.msg);
      } else {
        throw error;
      }
    }
  }
);

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.msg;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.msg;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UPDATE_USER_STATE, (state, action) => {
      state.loading = action.payload.loading;
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.error = action.payload.error;
    });
    builder.addCase(UPDATE_PROFILE_RESET, (state) => {
      state.isUpdated = false;
    });
    builder.addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
    builder.addCase(CLEAR_MESSAGE, (state) => {
      state.message = null;
    });
  },
});

export default forgotPasswordSlice.reducer;
