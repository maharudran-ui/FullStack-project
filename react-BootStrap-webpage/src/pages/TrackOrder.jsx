import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import WestindiesBookGrid from "../components/product/WestIndiesBooksGrid"; 
import CategoriesBar from "../components/common/CategoriesBar";
import SearchBar from "../components/common/SearchBar";
import StockPagination from "../components/product/StockPagination";
import PhilatelicBookGrid from "../components/product/PhilatelicBookGrid";



import axios from "axios";
import api from "../services/api";


function TrackOrder() {
  const [groups, setGroups] = useState([]);
  const [groupValues, setGroupValues] = useState({});
  const [activeCategory, setActiveCategory] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [activeFilter, setActiveFilter] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [products, setProducts] = useState([]);
  
const [allProducts, setAllProducts] = useState([]);
const [searchText, setSearchText] = useState("");
const [searchScope, setSearchScope] = useState("catalogue");
const [searchDescription, setSearchDescription] = useState(false);


useEffect(() => {
    setCurrentPage(1);
}, [searchText, searchScope, searchDescription]);

  
  const location = useLocation();
  

  
  const categoryMap = {
    "Philatelic Books": 1,
    "West Indies Books": 2,
    "Miscellaneous books": 3,
    "Maps, Prints, Photographs Ephemera": 4,
    "Old Picture Postcards": 5,
    "Stamps and Covers": 6
  };

  const getCategoryId = (name) => categoryMap[name];


  // fetchproducts

const loadProducts = async () => {
  try {
    const res = await api.get("/products?limit=100");

    setProducts(res.data.products);
setAllProducts(res.data.products);
  } catch (err) {
    console.log(err);
  }
};

const loadProductsByCategory = async (categoryName) => {
  try {
    const res = await api.get("/products?limit=100");

    const categoryId = getCategoryId(categoryName);

    const filteredProducts = res.data.products.filter(
      (p) => p.category_id === categoryId
    );

    setProducts(filteredProducts);
    setCurrentPage(1);
  } catch (err) {
    console.log(err);
  }
};




useEffect(() => {
  loadProducts();
}, []);

  
  const fetchGroups = async (categoryName) => {
    try {
      if (!categoryName) return;
      const categoryId = getCategoryId(categoryName);
      
      const res = await api.get(`/groups/category/${categoryId}`);
      setGroups(res.data);

   
      fetchAllGroupValues(categoryId, res.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  
  const fetchAllGroupValues = async (categoryId, groupsList) => {
    try {
      const result = {};
      await Promise.all(
        groupsList.map(async (group) => {
          const res = await api.get(
            `/values/category/${categoryId}/group/${group.group_id}`
          );
          result[group.group_id] = res.data;
        })
      );
      setGroupValues(result);
    } catch (err) {
      console.error("Error fetching group values:", err);
    }
  };


  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

useEffect(() => {
  if (activeCategory) {
    fetchGroups(activeCategory);
    loadProductsByCategory(activeCategory);
  } else {
    setGroups([]);
    setGroupValues({});
  }
}, [activeCategory]);

  // Get raw local list matching active category
  // const getProcessedProducts = () => {
  //   let list = [];
  //   if (activeCategory === "Philatelic Books") list = philatelicBooks;
  //   else if (activeCategory === "West Indies Books") list = westIndiesBooks;
  //   else if (activeCategory === "Miscellaneous books") list = miscellaneousBooks;
  //   else if (activeCategory === "Maps, Prints, Photographs Ephemera") list = mapsEphemera;
  //   else if (activeCategory === "Old Picture Postcards") list = oldPostcards;
  //   else if (activeCategory === "Stamps and Covers") list = stampsCovers;
  //   return list;
  // };

 
let filteredProducts = products;

// Only search the whole catalogue when
// user selected Whole Catalogue AND entered text

if (
  searchScope === "catalogue" &&
  searchText.trim() !== ""
) {
  filteredProducts = allProducts;
}

// Search
if (searchText.trim()) {

  filteredProducts = filteredProducts.filter((product) => {

    const keyword = searchText.toLowerCase();

    if (searchDescription) {

      return (
        product.description &&
        product.description
          .toLowerCase()
          .includes(keyword)
      );

    }

    return (
      (product.title || product.tittle || "")
        .toLowerCase()
        .includes(keyword)
    );

  });

}

// Sorting

const currentProducts = [...filteredProducts].sort((a, b) => {

  if (activeFilter === "low-high")
    return Number(a.price) - Number(b.price);

  if (activeFilter === "high-low")
    return Number(b.price) - Number(a.price);

  if (activeFilter === "author-date")
    return (a.title || a.tittle || "").localeCompare(
      b.title || b.tittle || ""
    );

  return 0;

});



const filterByValue = async (valueId) => {
  try {
    const res = await api.get(`/products/value/${valueId}`);

    const categoryId = getCategoryId(activeCategory);

    const filteredProducts = res.data.filter(
      (p) => p.category_id === categoryId
    );

    setProducts(filteredProducts);
  } catch (err) {
    console.log(err);
  }
};

  // Pagination bounds logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedProducts = currentProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);

  const isProductCategory = Object.keys(categoryMap).includes(activeCategory);

  const handleVerify = () => {
    if (email.trim() !== "") {
      setVerified(true);
    } else {
      alert("Please enter your email address");
    }
  };

  // Shared drop-down theme styling
  const selectStyle = {
    maxWidth: "160px",
    backgroundColor: "#803300",
    color: "#fff",
    borderColor: "#803300",
    borderRadius: "20px"
  };

  return (
    <div style={{ backgroundColor: "#efefc8", minHeight: "100vh", paddingBottom: "80px" }}>
      <Container fluid="lg">
        {/* CATEGORIES NAVIGATION MENU */}
        <CategoriesBar
          activeCategory={activeCategory}
          setActiveCategory={(category) => {
            setActiveCategory(category);
            setCurrentPage(1);
          }}
        />

        {isProductCategory ? (
          <div className="animate-fade-in">
            <div>
              <h5 style={{ fontFamily: "Georgia, serif", color: "#803300", fontWeight: "bold" }} className="mt-5 mb-3">
                Search by
              </h5>
              <Row className="align-items-start mb-5 gy-3">
                <Col xs={12} md={6} className="d-flex gap-2 flex-wrap">
                  
                  {/* API DYNAMIC DROPDOWNS */}
                  {groups.map((group) => (
  <Form.Select
    key={group.group_id}
    style={selectStyle}
    defaultValue=""
    onChange={(e) => {
      const valueId = e.target.value;

      if (valueId) {
        filterByValue(valueId);
      } else {
        loadProducts();
      }

      
      e.target.value = "";
    }}
  >
    <option value="">
      {group.group_name} ▾
    </option>

    {groupValues[group.group_id]?.map((val) => (
      <option
        key={val.value_id}
        value={val.value_id}
      >
        {val.value_name}
      </option>
    ))}
  </Form.Select>
))}

                </Col>
                <Col xs={12} md={6} className="d-flex flex-column align-items-md-end text-dark">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    {activeCategory && <SearchBar
    searchText={searchText}
    setSearchText={setSearchText}
    searchScope={searchScope}
    setSearchScope={setSearchScope}
    searchDescription={searchDescription}
    setSearchDescription={setSearchDescription}
/>}
                  </div>
                </Col>
              </Row>
            </div>

            {/* DYNAMIC HEADER DESCRIPTIONS */}
            <div className="mb-4">
              <h1 style={{ fontFamily: "Georgia, serif", color: "#2d3748", fontWeight: "bold", fontSize: "2.2rem" }} className="mb-3">
                {activeCategory}
              </h1>
          
              {activeCategory === "West Indies Books" && (
                <div className="mt-4 mb-5 px-2" style={{ fontFamily: "Georgia, serif", color: "#2d3748", fontSize: "1.05rem", lineHeight: "1.6" }}>
                  <p className="mb-3">Books on the Caribbean for sale.</p>
                  <p>Post and packing is extra. Orders are packed carefully and covered by my insurance. Costs are kept to a minimum.</p>
                </div>
              )}

              {activeCategory === "Miscellaneous books" && (
                <div className="mt-4 mb-5 px-2" style={{ fontFamily: "Georgia, serif", color: "#2d3748", fontSize: "1.05rem", lineHeight: "1.6" }}>
                  <p>Out of print and antiquarian books for sale.</p>
                </div>
              )}

              {activeCategory === "Philatelic Books" && (
                <div className="mt-4 mb-5 px-2" style={{ fontFamily: "Georgia, serif", color: "#2d3748", fontSize: "1.05rem", lineHeight: "1.6" }}>
                  <p className="mb-3">Books on philately for sale. Post and packing is extra. Costs are kept to a minimum.</p>
                  <p>To view the Philatelic Books of <a href="#" style={{ color: "black", fontWeight: "lighter", marginLeft: "5px", textDecoration: "underline" }}>W.I.P.S.G. publications, click here</a></p>
                </div>
              )}
              
              {activeCategory === "Maps, Prints, Photographs Ephemera" && (
                <div className="mt-4 mb-5 px-2" style={{ fontFamily: "Georgia, serif", color: "#2d3748", fontSize: "1.05rem", lineHeight: "1.6" }}>
                  <div className=" mb-4">
                    <span className="fw-bold" style={{ fontSize: "0.9rem", display: "inline-block" }}>All maps and prints are guaranteed originals. I do not sell reproductions.</span>
                  </div>
                  <p className="text-start">
                    Maps and prints of the World for sale. My stock is mostly concentrated on the Caribbean. 
                    You will also find old photographs and posters here. I am keen to purchase fine engraved 
                    West Indies prints and C17th and C18th Caribbean maps.
                  </p>
                  <p className="mb-4 text-start">Post and packing is extra. Orders are packed carefully and covered by my insurance. Costs are kept to a minimum.</p>
                  <p className="mb-0 text-muted small text-start" style={{ fontStyle: "italic" }}>Images have been cropped close to the frame of the map to keep file sizes reasonably small. Actual margins will be greater unless noted in the description.</p>
                </div>
              )}

              {activeCategory === "Old Picture Postcards" && (
                <div className="mt-4 mb-5 px-2" style={{ fontFamily: "Georgia, serif", color: "#2d3748", fontSize: "1.05rem", lineHeight: "1.6" }}>
                  <p className="mb-4 text-start">Old picture postcards from the Caribbean islands for sale plus a few collectable cards from around the World. Post and packing is extra but does not increase however many items are ordered. Inland £1, Europe and Overseas £3</p>
                </div>
              )}
            </div>

            {/* FILTER BUTTONS */}
            <div className="d-flex flex-wrap gap-2 mt-4 mb-5">
              {[
                { id: "newest", label: "Newest items" },
                { id: "author-date", label: "Author or date" },
                { id: "high-low", label: "High to low price" },
                { id: "low-high", label: "Low to high price" }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveFilter(btn.id)}
                  style={{
                    backgroundColor: activeFilter === btn.id ? "#803300" : "transparent",
                    color: activeFilter === btn.id ? "#ffffff" : "#803300",
                    border: "1px solid #803300",
                    padding: "6px 16px",
                    cursor: "pointer"
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* PRODUCT GRIDS */}
            {paginatedProducts.length > 0 ? (
              activeCategory === "Philatelic Books" ? (
                <PhilatelicBookGrid products={paginatedProducts} />
              ) : (
                <WestindiesBookGrid books={paginatedProducts} />
              )
            ) : (
              <div className="text-center py-5 text-muted">
                No items listed under this category combination.
              </div>
            )}

            {/* PAGINATION */}
            <StockPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

           
            {activeCategory === "West Indies Books" && (
              <div className="mt-5 pt-4 border-top text-start" style={{ fontFamily: "Georgia, serif", color: "#2d3748" }}>
                <h4 className="fw-bold mb-4" style={{ fontSize: "1.25rem" }}>Links to other West Indies sites</h4>
                <div className="mb-4">
                  <h5 style={{ fontSize: "1.05rem", fontWeight: "bold" }}>Family history of Jamaica</h5>
                  <a href="http://www.mymynton.com/index.htm" target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>http://www.mymynton.com/index.htm</a>
                  <p className="mt-2">Sources of genealogy and historical information</p>
                </div>
                <div className="mb-3">
                  <h5 style={{ fontSize: "1.05rem", fontWeight: "bold" }}>Turks and Caicos Islands Museum</h5>
                  <a href="http://www.tcmuseum.org" target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>http://www.tcmuseum.org</a>
                </div>
              </div>
            )}
            
            {activeCategory === "Philatelic Books" && (
              <div className="mt-5 pt-4 border-top text-start" style={{ fontFamily: "Georgia, serif", color: "#2d3748" }}>
                <h4 className="fw-bold mb-3" style={{ fontSize: "1.25rem" }}>Links to other Philatelic Sites</h4>
                <div className="mb-3">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="fw-bold" style={{ color: "black", fontSize: "1.05rem" }}>West Indies Philatelic Study Group</a>
                  <p className="mt-2" style={{ fontSize: "1rem" }}>(Regular journal with articles on stamps and postal history plus meetings around the world.)</p>
                </div>
              </div>
            )}

            {activeCategory === "Maps, Prints, Photographs Ephemera" && (
              <div className="mt-5 pt-4 border-top text-start" style={{ fontFamily: "Georgia, serif", color: "#2d3748", borderColor: "#803300" }}>
                <h4 className="mb-4" style={{ fontSize: "0.9rem" }}>Links to other websites of interest:</h4>
                <div className="mb-4">
                  <p style={{ fontSize: "0.9rem", marginBottom: "8px" }}>Caribbean Photo Archive - Many old photos sorted by islands plus video clips from old home movies</p>
                  <a href="http://www.caribbeanphotoarchive.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", fontSize: "0.9rem" }}>http://www.caribbeanphotoarchive.com/</a>
                </div>
                <div className="mb-3">
                  <p style={{ fontSize: "0.9rem", marginBottom: "8px" }}>Caribmap - A Cartographic history of the Caribbean Islands</p>
                  <a href="http://www.caribmap.org/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem" }}>http://www.caribmap.org/</a>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* DEFAULT ORDER TRACKER INTERFACE */
          <div style={{ marginTop: "40px", textAlign: "left" }} className="animate-fade-in">
            <h2 style={{ fontFamily: "Georgia, serif", color: "#212529", fontSize: "32px", marginBottom: "15px", fontWeight: "normal" }}>
              Track Your Order
            </h2>
            <p style={{ fontFamily: "Arial, sans-serif", color: "#212529", marginBottom: "25px", fontSize: "15px" }}>
              Please enter your Email address to confirm your identity and receive details about your orders.
            </p>

            {!verified ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" }}>
                <label style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", color: "#212529" }}>Email</label>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", width: "100%", flexWrap: "wrap" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email here"
                    style={{
                      width: "300px", maxWidth: "100%",
                      padding: "10px 14px", border: "1px solid #803300", 
                      backgroundColor: "transparent", fontSize: "16px",
                      fontFamily: "Arial, sans-serif", color: "#4a5568"
                    }}
                  />
                  <button
                    onClick={handleVerify}
                    style={{   
                      backgroundColor: "transparent", color: "#0056b3", 
                      border: "none", padding: "0", fontSize: "16px",
                      textDecoration: "underline", cursor: "pointer",
                      fontFamily: "Arial, sans-serif"
                    }}
                  >
                    Verify User
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "20px" }}>
                <h4 style={{ fontFamily: "Georgia, serif", color: "#803300" }}>Your Orders</h4>
                <p className="text-muted">Showing order status information for: {email}</p>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default TrackOrder;