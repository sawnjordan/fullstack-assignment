import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UPDATE_USER_STATE } from "../auth/userActionTypes";

const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";
const CLEAR_ERRORS = "CLEAR_ERRORS";

const initialState = {};

// Axios configuration with headers
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
export const updateUser = createAsyncThunk("auth/update", async (userData) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/api/v1/auth/me/update",
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
export const adminUpdateUser = createAsyncThunk(
  "auth/adminUpdate",
  async ({ userId, userData }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/auth/user/${userId}`,
        userData,
        config
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        const err = error.response.data.msg;
        throw Error(err);
      }
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "auth/updatePassword",
  async (userPasswords) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/auth/update-password",
        userPasswords,
        config
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        throw Error(error.response.data.msg);
      } else {
        throw error;
      }
    }
  }
);

export const updateSlice = createSlice({
  name: "updateUser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.updatedUser;
      state.isUpdated = action.payload.status;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(adminUpdateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminUpdateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.status;
    });
    builder.addCase(adminUpdateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(updateUserPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.updatedUser;
      state.isUpdated = action.payload.status;
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
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
  },
});

export default updateSlice.reducer;
