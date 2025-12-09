import React from "react";
import "../App.css";

const categories = ["All", "Music", "Gaming", "Sports", "Education", "Technology", "Movies"];

const Filters = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="filter-container">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filters;