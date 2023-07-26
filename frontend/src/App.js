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
import { useEffect } from "react";
import { UPDATE_USER_STATE } from "./features/auth/userActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "./components/user/Profile";
import { ProtectedRoute } from "./components/routes/ProtectedRoutes";

function App() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.loadUser
  );
  useEffect(() => {
    if (isAuthenticated) {
      dispatch({
        type: UPDATE_USER_STATE,
        payload: { loading, isAuthenticated, error, user },
      });
    }
  }, [dispatch, isAuthenticated, loading, error, user]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route
          path="/me"
          element={<ProtectedRoute Component={Profile} />}
          exact
        />
        <Route path="/register" element={<Register />} exact />
        <Route path="/books/:id" element={<BookDetails />} exact />
        <Route path="/books/search/:keyword" element={<Home />} exact />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
