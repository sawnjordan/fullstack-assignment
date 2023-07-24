import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState from "../initialState";
import { UPDATE_USER_STATE } from "./userActionTypes";

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/auth/me", {
      withCredentials: true, // This allows cookies to be sent with the request
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.response) {
      throw Error(error.response.data.response);
    } else {
      throw error;
    }
  }
});

export const loadUserSlice = createSlice({
  name: "loadUser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.response;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
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

export default loadUserSlice.reducer;
