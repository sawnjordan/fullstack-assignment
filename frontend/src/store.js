import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./features/book/booksSlices";
import bookReducer from "./features/book/bookSlices";
import loginReducer from "./features/auth/loginSlice";
import registerReducer from "./features/auth/registerSlice";
import loadUserReducer from "./features/auth/loadUserSlice";
import logoutReducer from "./features/auth/logoutSlice";
import updateReducer from "./features/user/updateSlice";
import forgotPasswordReducer from "./features/user/forgotPasswordSlice";
import allUsersReducer from "./features/user/allUsersSlice";
import addToCartReducer from "./features/book/cartSlice";
import newOrderReducer from "./features/order/newOrderSlice";
import myOrderReducer from "./features/order/myOrderSlice";
import allOrdersReducer from "./features/order/allOrdersSlice";
import orderDetailsReducer from "./features/order/orderDetailSlice";
import updateOrderReducer from "./features/order/orderSlice";
import adminBookReducer from "./features/book/adminBookSlice";
import initialState from "./features/initialState";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingInfoFromStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};

export const store = configureStore({
  reducer: {
    books: booksReducer,
    book: bookReducer,
    login: loginReducer,
    register: registerReducer,
    loadUser: loadUserReducer,
    logoutUser: logoutReducer,
    updateUser: updateReducer,
    allUsers: allUsersReducer,
    forgotPassword: forgotPasswordReducer,
    addToCart: addToCartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    updateOrder: updateOrderReducer,
    adminBooks: adminBookReducer,
  },
  preloadedState: {
    addToCart: {
      cartItems: cartItemsFromStorage,
      shippingInfo: shippingInfoFromStorage,
    },
    loadUser: initialState,
  },
});
