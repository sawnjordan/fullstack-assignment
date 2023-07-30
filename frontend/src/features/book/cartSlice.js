import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SAVE_SHIPPING_INFO = "SAVE_SHIPPING_INFO";
const initialState = {
  cartItems: [],
  shippingInfo: {},
};
export const addItemsToCart = createAsyncThunk(
  "book/addToCart",
  async ({ id, quantity }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/books/${id}`
      );
      return {
        book_id: data.response._id,
        title: data.response.title,
        price: data.response.price,
        stock: data.response.stock,
        quantity,
      };
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.response
      ) {
        // Extract the error message from the response and throw a new error with it
        throw new Error(error.response.data.response);
      } else {
        // If there's no specific error message in the response, re-throw the original error
        throw error;
      }
    }
  }
);
export const removeItemsFromCart = createAsyncThunk(
  "book/removeFromCart",
  async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/books/${id}`
      );
      return {
        book_id: data.response._id,
      };
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.response
      ) {
        // Extract the error message from the response and throw a new error with it
        throw new Error(error.response.data.response);
      } else {
        // If there's no specific error message in the response, re-throw the original error
        throw error;
      }
    }
  }
);

export const addToCartSlice = createSlice({
  name: "book/addToCart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addItemsToCart.fulfilled, (state, action) => {
      const item = action.payload;
      const itemExistsInCart = state.cartItems.find(
        (i) => i.book_id === item.book_id
      );
      if (itemExistsInCart) {
        state.cartItems = state.cartItems.map((i) =>
          i.book_id === itemExistsInCart.book_id ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    });
    builder.addCase(removeItemsFromCart.fulfilled, (state, action) => {
      const { book_id } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.book_id !== book_id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    });
    builder.addCase(SAVE_SHIPPING_INFO, (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    });
  },
});

export default addToCartSlice.reducer;
