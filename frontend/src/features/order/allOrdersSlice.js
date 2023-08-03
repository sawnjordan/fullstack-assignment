import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  error: null,
};
const CLEAR_ERRORS = "CLEAR_ERRORS";

export const allOrders = createAsyncThunk("order/me", async () => {
  try {
    // const response = await axios.post(`http://localhost:5000/api/v1/order/new`);
    const response = await axios.get(
      "http://localhost:5000/api/v1/admin/order/all",
      {
        withCredentials: true,
      }
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

export const allOrderSlice = createSlice({
  name: "allOrders",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(allOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(allOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.response;
      state.totalAmount = action.payload.totalAmount;
      state.error = "";
    });
    builder.addCase(allOrders.rejected, (state, action) => {
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

export default allOrderSlice.reducer;
