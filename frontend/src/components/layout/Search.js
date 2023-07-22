import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Search = ({ navigate }) => {
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setKeyword("");
    }
  }, [location.pathname]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/books/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};
