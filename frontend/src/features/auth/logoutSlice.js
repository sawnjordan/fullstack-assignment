import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState from "../initialState";
import { UPDATE_USER_STATE } from "./userActionTypes";

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/auth/logout",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.response) {
      throw Error(error.response.data.response);
    } else {
      throw error;
    }
  }
});

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
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

export default logoutSlice.reducer;
