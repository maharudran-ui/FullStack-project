import React from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/SearchBar.css";

function SearchBar({
  searchText,
  setSearchText,
  searchScope,
  setSearchScope,
  searchDescription,
  setSearchDescription,
  onSearch,
}) {

  useEffect(() => {
    if (searchText.trim() === "") {
        setSearchKeyword("");
        setSearchClicked(false);
    }
}, [searchText]);
  return (
    <div className="search-wrapper">

      <div className="search-input-wrapper">

 <input
    type="text"
    className="search-input"
    value={searchText}
    onChange={(e)=>setSearchText(e.target.value)}
    onKeyDown={(e)=>{
        if(e.key==="Enter"){
            onSearch();
        }
    }}
    placeholder="Search..."
/>

        

<button
  className="search-button"
  onClick={onSearch}
>
          <FaSearch className="search-icon" />
        </button>

      </div>

      <div className="search-filters">

        <label className="search-label">
          <input
            type="radio"
            name="searchScope"
            checked={searchScope === "catalogue"}
            onChange={() => setSearchScope("catalogue")}
          />
          Whole Catalogue
        </label>

        <label className="search-label">
          <input
            type="radio"
            name="searchScope"
            checked={searchScope === "category"}
            onChange={() => setSearchScope("category")}
          />
          This Category
        </label>

        <label className="search-label">
          <input
            type="checkbox"
            checked={searchDescription}
            onChange={(e) =>
              setSearchDescription(e.target.checked)
            }
          />
          Search by description
        </label>

      </div>

    </div>
  );
}

export default SearchBar;