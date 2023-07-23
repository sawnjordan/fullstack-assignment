import { Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./components/Home";
import { BookDetails } from "./components/book/BookDetails";
import { Login } from "./components/user/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Register } from "./components/user/Register";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/books/:id" element={<BookDetails />} exact />
        <Route path="/books/search/:keyword" element={<Home />} exact />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
