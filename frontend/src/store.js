import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./features/book/booksSlices";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
