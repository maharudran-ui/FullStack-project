
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import api from "../../services/api";
import "../../styles/CategoriesBar.css";

function CategoriesBar({ activeCategory, setActiveCategory }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  // Load API categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await api.get("/categories/get");

      console.log("API DATA:", res.data);

      
      const formatted = res.data.map(
        (cat) => cat.category_name
      );

      setCategories(formatted);
    } catch (err) {
      console.log("Error loading categories:", err);
    }
  };

  return (
    <Row className="categories-wrapper">
      <Col>
        <h2 className="categories-title">
          Categories
        </h2>

        {/* MOBILE DROPDOWN */}
        <div className="d-block d-md-none">
          <select
            className="mobile-category-dropdown"
            value={activeCategory}
            onChange={(e) => {
              const selected = e.target.value;

              setActiveCategory(selected);

              localStorage.setItem(
                "selectedCategory",
                selected
              );

              navigate("/track-order");
            }}
          >
            <option value="">
              Select Category
            </option>

            {categories.map((categoryName) => (
              <option
                key={categoryName}
                value={categoryName}
              >
                {categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="categories-buttons d-none d-md-flex">
          {categories.map((categoryName) => (
            <button
              key={categoryName}
              onClick={() => {
                setActiveCategory(categoryName);

                localStorage.setItem(
                  "selectedCategory",
                  categoryName
                );

                navigate("/track-order");
              }}
              className={`category-btn ${
                activeCategory === categoryName
                  ? "active"
                  : ""
              }`}
            >
              {categoryName}
            </button>
          ))}
        </div>
      </Col>
    </Row>
  );
}

export default CategoriesBar;


 


