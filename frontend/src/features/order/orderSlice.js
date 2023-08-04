import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};
const postConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const getConfig = {
  withCredentials: true,
};
// const RESET_DELETE_BOOK = "RESET_DELETE_BOOK";

const CLEAR_ERRORS = "CLEAR_ERRORS";
const RESET_UPDATE_ORDER = "RESET_UPDATE_ORDER";

export const updateOrder = createAsyncThunk(
  "book/updateOrder",
  async ({ id, orderData }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/admin/order/${id}`,
        orderData,
        postConfig
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
  }
);

export const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
      state.error = "";
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RESET_UPDATE_ORDER, (state) => {
      state.loading = false;
      state.isUpdated = false;
    });
    builder.addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
