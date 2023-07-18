import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/book/bookSlices";

export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});
