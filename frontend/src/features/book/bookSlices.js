import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  book: [],
  count: "",
  error: "",
};

//Generates pending, fulfilled or rejected action types
// export const fetchBook = createAsyncThunk("book/fetchBook", () => {
//   axios.get("http://localhost:5000/api/v1/books").then((response) => {
//     console.log(response);
//     return response.data;
//   });
// });

export const fetchBook = createAsyncThunk("book/fetchBook", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/books");
    return response.data;
  } catch (error) {
    throw Error("Error fetching books: " + error.message);
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
      state.books = action.payload.response;
      state.count = action.payload.count;
      state.error = "";
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.count = "";

      state.error = action.error;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = bookSlice.actions;

export default bookSlice.reducer;
