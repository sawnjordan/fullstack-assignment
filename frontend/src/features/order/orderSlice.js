import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const newOrder = createAsyncThunk("order/new", async (order) => {
  try {
    // const response = await axios.post(`http://localhost:5000/api/v1/order/new`);
    const response = await axios.post(
      "http://localhost:5000/api/v1/order/new",
      order,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.response) {
      // Extract the error message from the response and throw a new error with it
      throw new Error(error.response.data.response);
    } else {
      // If there's no specific error message in the response, re-throw the original error
      throw error;
    }
  }
});

export const orderSlice = createSlice({
  name: "newOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(newOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(newOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.response;
      state.error = "";
    });
    builder.addCase(newOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = bookSlice.actions;

export default orderSlice.reducer;
