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
const RESET_DELETE_BOOK = "RESET_DELETE_BOOK";

const CLEAR_ERRORS = "CLEAR_ERRORS";
const RESET_UPDATE_BOOK = "RESET_UPDATE_BOOK";

export const deleteBook = createAsyncThunk("book/deleteBook", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/books/${id}`,
      postConfig
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.response) {
      throw Error(error.response.data.response);
    } else {
      throw error;
    }
  }
});
export const updateBook = createAsyncThunk(
  "book/updateBook",
  async ({ id, bookData }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/books/${id}`,
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

export const adminBookSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.loading = false;
      state.book = action.payload.response;
      state.isDeleted = action.payload.success;
      state.message = action.payload.msg;
      state.error = "";
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.book = {};
      state.error = action.error;
    });
    builder.addCase(updateBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.loading = false;
      state.book = action.payload.updatedBook;
      state.isUpdated = action.payload.success;
      state.message = action.payload.msg;
      state.error = "";
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.loading = false;
      state.book = {};
      state.error = action.error;
    });
    builder.addCase(RESET_DELETE_BOOK, (state) => {
      state.loading = false;
      state.isDeleted = false;
      state.book = null;
      state.message = "";
    });
    builder.addCase(RESET_UPDATE_BOOK, (state) => {
      state.loading = false;
      state.isUpdated = false;
      state.book = null;
      state.message = "";
    });
    builder.addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = adminBookSlice.actions;

export default adminBookSlice.reducer;
