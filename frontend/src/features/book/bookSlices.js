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
    throw Error("Error fetching book: " + error.message);
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
