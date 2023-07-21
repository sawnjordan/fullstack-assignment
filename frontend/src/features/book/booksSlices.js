import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  books: [],
  count: "",
  totalBooks: "",
  resPerPage: "",
  error: "",
};

//Generates pending, fulfilled or rejected action types
// export const fetchBooks = createAsyncThunk("book/fetchBooks", () => {
//   axios.get("http://localhost:5000/api/v1/books").then((response) => {
//     console.log(response);
//     return response.data;
//   });
// });

export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async ({ keyword = "", currentPage = 1 }) => {
    // console.log(keyword, currentPage);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/books?page=${currentPage}&keyword=${keyword}`
      );
      return response.data;
    } catch (error) {
      throw Error("Error fetching books: " + error.message);
    }
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload.response;
      state.count = action.payload.count;
      state.resPerPage = action.payload.resPerPage;
      state.totalBooks = action.payload.totalBooks;
      state.error = "";
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.error = action.error;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = booksSlice.actions;

export default booksSlice.reducer;
