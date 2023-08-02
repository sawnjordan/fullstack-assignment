import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  books: [],
  book: {},
  success: false,
};
const postConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const getConfig = {
  withCredentials: true,
};
const RESET_NEW_BOOK = "RESET_NEW_BOOK";
const CLEAR_ERRORS = "CLEAR_ERRORS";

export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async ({ keyword = "", currentPage = 1 }) => {
    try {
      if (keyword === "" && currentPage === 1) {
        const response = await axios.get(
          `http://localhost:5000/api/v1/books`,
          getConfig
        );
        return response.data;
      } else if (keyword === "") {
        const response = await axios.get(
          `http://localhost:5000/api/v1/books?page=${currentPage}`,
          getConfig
        );
        return response.data;
      } else if (currentPage === 1) {
        const response = await axios.get(
          `http://localhost:5000/api/v1/books?keyword=${keyword}`,
          getConfig
        );
        return response.data;
      } else {
        const response = await axios.get(
          `http://localhost:5000/api/v1/books?page=${currentPage}&keyword=${keyword}`,
          getConfig
        );
        return response.data;
      }
    } catch (error) {
      throw Error("Error fetching books: " + error.message);
    }
  }
);
export const fetchAdminBooks = createAsyncThunk(
  "book/fetchAdminBooks",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/books/admin`,
        getConfig
      );
      return response.data;
    } catch (error) {
      throw Error("Error fetching books: " + error.message);
    }
  }
);
export const createNewBook = createAsyncThunk(
  "book/createNewBook",
  async (bookData) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/books/new`,
        bookData,
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
    builder.addCase(fetchAdminBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAdminBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload.books;
      state.error = "";
    });
    builder.addCase(fetchAdminBooks.rejected, (state, action) => {
      state.loading = false;
      state.books = [];
      state.error = action.error;
    });
    builder.addCase(createNewBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewBook.fulfilled, (state, action) => {
      state.loading = false;
      state.book = action.payload.response;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(createNewBook.rejected, (state, action) => {
      state.loading = false;
      state.book = {};
      state.error = action.error;
    });
    builder.addCase(RESET_NEW_BOOK, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = booksSlice.actions;

export default booksSlice.reducer;
