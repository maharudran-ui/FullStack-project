import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import "../../styles/stockGrid.css";
import { FaFilter } from "react-icons/fa";
import CartNotification from "../cart/CartNotification";

function StockGrid({
  products,
  sortBy,
  setSortBy
}) {
  const dispatch = useDispatch();

  const [showMessage, setShowMessage] =
    useState(false);

  const handleAddToCart = (product) => {
  setShowMessage(true);

  setTimeout(() => {
    setShowMessage(false);
  }, 3000);

  dispatch(
    addToCart({
      id: product.product_id,
      title: product.tittle,
      image: `${import.meta.env.VITE_API_URL}/uploads/${product.product_image}`,
      description: product.description,
      price: product.price,
    })
  );
};

  const handleSort = (filterType) => {
    let apiSort = "newest";

    switch (filterType) {
      case "low-to-high":
        apiSort = "price_asc";
        break;

      case "high-to-low":
        apiSort = "price_desc";
        break;

      case "author":
        apiSort = "author_asc";
        break;

      default:
        apiSort = "newest";
    }

    setSortBy(apiSort);
  };

  return (
    <div className="stock-section-wrapper w-100">
      <h2 className="stock-main-title mb-4">
        Stock for Sale
      </h2>

      {/* MOBILE FILTER */}
      <div className="d-block d-md-none mb-4">
        <div className="mobile-filter-wrapper">
          <FaFilter className="mobile-filter-icon" />

          <span className="mobile-filter-text">
            Filter
          </span>

          <select
            className="mobile-filter-dropdown"
            value={sortBy}
            onChange={(e) =>
              handleSort(e.target.value)
            }
          >
            <option value="newest">
              Newest items
            </option>

            <option value="author">
              Author or Date
            </option>

            <option value="high-to-low">
              High to low price
            </option>

            <option value="low-to-high">
              Low to high price
            </option>
          </select>
        </div>
      </div>

      {/* DESKTOP FILTERS */}
      <div className="filter-buttons-bar d-none d-md-flex flex-wrap gap-2 mb-4">
        <button
          className={`filter-btn ${
            sortBy === "newest"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleSort("newest")
          }
        >
          Newest items
        </button>

        <button
          className={`filter-btn ${
            sortBy === "author_asc"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleSort("author")
          }
        >
          Author or Date
        </button>

        <button
          className={`filter-btn ${
            sortBy === "price_desc"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleSort("high-to-low")
          }
        >
          High to low price
        </button>

        <button
          className={`filter-btn ${
            sortBy === "price_asc"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleSort("low-to-high")
          }
        >
          Low to high price
        </button>
      </div>

      <Row className="gx-4 gy-4 justify-content-start">
        {products.map((stamp) => (
          <Col
            key={stamp.product_id}
            lg={3}
            md={4}
            sm={6}
            xs={12}
            className="d-flex"
          >
            <div className="stamp-card h-100">
              <div className="stamp-img-frame">
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${product.product_image}`}
                  alt={stamp.tittle}
                  className="stamp-img"
                />
              </div>

              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <span className="stamp-txt-year">
                  {stamp.year}
                </span>

                <span className="stamp-txt-price">
                  £ {stamp.price}
                </span>
              </div>

              <div className="stamp-body flex-grow-1">
                <p className="stamp-title">
                  {stamp.tittle}
                </p>

                {stamp.description && (
                  <p className="stamp-description">
                    {stamp.description}
                  </p>
                )}
              </div>

              <div className="d-flex justify-content-end mt-3">
                <Button
                  className="stamp-add-btn"
                  onClick={() =>
                    handleAddToCart(stamp)
                  }
                >
                  Add to cart
                </Button>
              </div>
            </div>

            <CartNotification
              show={showMessage}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default StockGrid;