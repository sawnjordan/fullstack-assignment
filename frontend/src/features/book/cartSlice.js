import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  cartItems: [],
};
export const addItemsToCart = createAsyncThunk(
  "book/addToCart",
  async ({ id, quantity }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/books/${id}`
      );
      return {
        book_id: data.response.id,
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

export const addToCartSlice = createSlice({
  name: "book/addToCart",
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(fetchBook.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(fetchBook.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.book = action.payload.response;
    //   state.error = "";
    // });
    // builder.addCase(fetchBook.rejected, (state, action) => {
    //   state.loading = false;
    //   state.book = [];
    //   state.error = action.error;
    // });
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
  },
});

// Action creators are generated for each case reducer function
// export const {} = addToCartSlice.actions;

export default addToCartSlice.reducer;
