import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./features/book/booksSlices";
import bookReducer from "./features/book/bookSlices";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookReducer,
  },
});
