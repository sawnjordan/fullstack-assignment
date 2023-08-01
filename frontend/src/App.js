import { Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./components/Home";
import { BookDetails } from "./components/book/BookDetails";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./features/auth/loadUserSlice";
import { store } from "./store";
import { useEffect, useState } from "react";
import { UPDATE_USER_STATE } from "./features/auth/userActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "./components/user/Profile";
import { ProtectedRoute } from "./components/routes/ProtectedRoutes";
import { UpdateProfile } from "./components/user/UpdateProfile";
import { UpdatePassword } from "./components/user/UpdatePassword";
import { Loader } from "./components/layout/Loader";
import { ForgotPassword } from "./components/user/ForgotPassword";
import { NewPassword } from "./components/user/NewPassword";
import { Cart } from "./components/cart/Cart";
import { Shipping } from "./components/cart/Shipping";
import { ConfirmOrder } from "./components/cart/ConfirmOrder";
import { Payment } from "./components/cart/Payment";
import { OrderSuccess } from "./components/cart/OrderSuccess";
import { ListOrders } from "./components/orders/ListOrders";
import { OrderDetails } from "./components/orders/OrderDetails";
import { Dashboard } from "./components/admin/Dashboard";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, error, user } = useSelector(
    (state) => state.loadUser
  );
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch({
  //       type: UPDATE_USER_STATE,
  //       payload: { loading, isAuthenticated, error, user },
  //     });
  //   }
  // }, [dispatch, isAuthenticated, loading, error, user]);

  // useEffect(() => {
  //   dispatch(loadUser());
  //   // console.log(isAuthenticated, "inapp");
  // }, [dispatch]);

  // if (loading) {
  //   return <Loader />;
  // }
  useEffect(() => {
    // Dispatch the loadUser action only on the first load of the app
    if (!isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    // Set loading state to false once the loadUser action is completed
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    // Check for authentication once the app is mounted
    if (isAuthenticated) {
      dispatch({
        type: UPDATE_USER_STATE,
        payload: { loading, isAuthenticated, error, user },
      });
    }
  }, [dispatch, isAuthenticated, loading, error, user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/cart" element={<Cart />} exact />
        <Route
          path="/me"
          element={<ProtectedRoute Component={Profile} />}
          exact
        />
        <Route
          path="/shipping"
          element={<ProtectedRoute Component={Shipping} />}
          exact
        />
        <Route
          path="/order/confirm"
          element={<ProtectedRoute Component={ConfirmOrder} />}
          exact
        />
        <Route
          path="/payment"
          element={<ProtectedRoute Component={Payment} />}
          exact
        />
        <Route
          path="/order/success"
          element={<ProtectedRoute Component={OrderSuccess} />}
          exact
        />
        <Route
          path="/orders/me"
          element={<ProtectedRoute Component={ListOrders} />}
          exact
        />
        <Route
          path="/order/:orderId"
          element={<ProtectedRoute Component={OrderDetails} />}
          exact
        />
        <Route
          path="/password/update"
          element={<ProtectedRoute Component={UpdatePassword} />}
          exact
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute Component={UpdateProfile} />}
          exact
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute isAdmin={false} Component={Dashboard} />}
          exact
        />
        <Route path="/register" element={<Register />} exact />
        <Route path="/forgot-password" element={<ForgotPassword />} exact />
        <Route
          path="/auth/reset-password/:token"
          element={<NewPassword />}
          exact
        />
        <Route path="/books/:id" element={<BookDetails />} exact />
        <Route path="/books/search/:keyword" element={<Home />} exact />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
