import { Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./components/Home";
import { BookDetails } from "./components/book/BookDetails";
import { Login } from "./components/user/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/books/:id" element={<BookDetails />} exact />
        <Route path="/books/search/:keyword" element={<Home />} exact />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
