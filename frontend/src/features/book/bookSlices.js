import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  book: [],
  error: "",
};

export const fetchBook = createAsyncThunk("book/fetchBook", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/books/${id}`
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

export const bookSlice = createSlice({
  name: "book",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.loading = false;
      state.book = action.payload.response;
      state.error = "";
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      state.loading = false;
      state.book = [];

      state.error = action.error;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = bookSlice.actions;

export default bookSlice.reducer;
