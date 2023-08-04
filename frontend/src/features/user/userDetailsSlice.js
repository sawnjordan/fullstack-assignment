import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  error: null,
};

const CLEAR_ERRORS = "CLEAR_ERRORS";

export const userDetails = createAsyncThunk(
  "auth/userDetails",
  async (userId) => {
    try {
      // const response = await axios.post(`http://localhost:5000/api/v1/order/new`);
      const response = await axios.get(
        `http://localhost:5000/api/v1/auth/users/${userId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.response
      ) {
        // Extract the error message from the response and throw a new error with it
        throw new Error(error.response.data.response);
      } else {
        // If there's no specific error message in the response, re-throw the original error
        throw error;
      }
    }
  }
);

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.response;
      state.error = null;
    });
    builder.addCase(userDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = bookSlice.actions;

export default userDetailsSlice.reducer;
