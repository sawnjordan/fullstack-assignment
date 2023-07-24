import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./features/book/booksSlices";
import bookReducer from "./features/book/bookSlices";
import loginReducer from "./features/auth/loginSlice";
import registerReducer from "./features/auth/registerSlice";
import loadUserReducer from "./features/auth/loadUserSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookReducer,
    login: loginReducer,
    register: registerReducer,
    loadUser: loadUserReducer,
  },
});
