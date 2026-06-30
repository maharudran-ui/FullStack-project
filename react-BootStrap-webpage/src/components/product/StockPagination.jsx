import React, { useState } from "react";
import "../../styles/stockPagination.css";

function StockPagination({ currentPage, totalPages, onPageChange }) {
  const [goToValue, setGoToValue] = useState("");

  const handleGoToSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(goToValue, 10);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setGoToValue("");
    }
  };


  const renderPageNumbers = () => {
    const pages = [];
      const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

   
    pages.push(
      <button key={1} className={`page-num-btn ${currentPage === 1 ? "active" : ""}`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

   if (start > 2) {
  pages.push(
    <span key="left-ellipsis" className="pagination-ellipsis">
      ...
    </span>
  );
}

   

for (let i = start; i <= end; i++) {
  pages.push(
    <button
      key={i}
      className={`page-num-btn ${currentPage === i ? "active" : ""}`}
      onClick={() => onPageChange(i)}
    >
      {i}
    </button>
  );
}

   if (end < totalPages - 1) {
  pages.push(
    <span key="right-ellipsis" className="pagination-ellipsis">
      ...
    </span>
  );
}

    
    if (totalPages > 1) {
      pages.push(
        <button key={totalPages} className={`page-num-btn ${currentPage === totalPages ? "active" : ""}`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="custom-pagination-container d-flex justify-content-center my-5">
      <div className="pagination-bar-card d-flex align-items-center flex-wrap gap-2">
        
        
        <button className="page-nav-arrow" disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹
        </button>
        {renderPageNumbers()}
        <button className="page-nav-arrow"   disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          ›
        </button>

        
        <form onSubmit={handleGoToSubmit} className="go-to-page-form d-flex align-items-center ms-3">
          <span className="go-to-label">Go to page</span>
          <input type="number"min="1"max={totalPages} className="go-to-input mx-2" value={goToValue}
            onChange={(e) => setGoToValue(e.target.value)}
          />
          <button type="submit" className="go-to-submit-link">
            Go &gt;
          </button>
        </form>

      </div>
    </div>
  );
}

export default StockPagination;