
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

      
      setCategories(res.data);
    } catch (err) {
      console.log("Error loading categories:", err);
    }
  }; console.log("CategoriesBar activeCategory:", activeCategory);

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
            value={activeCategory ? JSON.stringify(activeCategory) : ""}
            onChange={(e) => {
             const selected = JSON.parse(e.target.value);

setActiveCategory(selected);

localStorage.setItem(
  "selectedCategory",
  JSON.stringify(selected)
);

              navigate("/track-order");
            }}
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.category_id}
               value={JSON.stringify(category)}
              >
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="categories-buttons d-none d-md-flex">
         {categories.map((category) => (
            <button
            key={category.category_id}
              onClick={() => {
              setActiveCategory(category);

                localStorage.setItem(
  "selectedCategory",
  JSON.stringify(category)
);

                navigate("/track-order");
              }}
             className={`category-btn ${
  activeCategory?.category_id === category.category_id
    ? "active"
    : ""
}`}
            >
             {category.category_name}
            </button>
          ))}
        </div>
      </Col>
    </Row>
  );
}

export default CategoriesBar;


 


