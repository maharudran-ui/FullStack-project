import Container from "react-bootstrap/Container";
import ProductGrid from "../components/product/ProductGrid";
import StockGrid from "../components/product/StockGrid";
import { useState, useEffect } from "react";
import api from "../services/api";
import StockPagination from "../components/product/StockPagination";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stockProducts, setStockProducts] = useState([]);
  const [sortBy, setSortBy] = useState("newest");




  const categoryMap = {
    1: "Philatelic Books",
    2: "West Indies Books",
    3: "Miscellaneous books",
    4: "Maps, Prints, Photographs Ephemera",
    5: "Old Picture Postcards",
    6: "Stamps and Covers"
  };



useEffect(() => {
  loadProducts();
}, []);

useEffect(() => {
  loadStockProducts(currentPage, sortBy);
}, [currentPage, sortBy]);


const loadProducts = async () => {
  try {
    const res = await api.get("/products");

    setProducts(res.data.products);
  } catch (err) {
    console.log(err);
  }
};
  
  const latestProducts = [];

  Object.keys(categoryMap).forEach((categoryId) => {
    const categoryProducts = products.filter(
      (p) => p.category_id === Number(categoryId)
    );
    

    if (categoryProducts.length > 0) {
      const latest = [...categoryProducts].sort(
        (a, b) => b.product_id - a.product_id
      )[0];

      

      latestProducts.push({
        ...latest,
        
        category_name: categoryMap[categoryId]
        
      });
      
    }
  });

const loadStockProducts = async (
  page = 1,
  sort = "newest"
) => {
  try {
    const res = await api.get(
      `/products?page=${page}&limit=5&sort=${sort}`
    );

    setStockProducts(res.data.products);
    setTotalPages(res.data.totalPages);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Container
      className="py-5 px-3 px-md-0 mx-auto"
      style={{ maxWidth: "1100px" }}
    >
      <h2 className="collectables-title">
        Collectables
      </h2>

      <ProductGrid products={latestProducts} />

      <hr
        style={{
          margin: "60px 0",
          borderTop: "1px solid #ccc"
        }}
      />

<StockGrid
  products={stockProducts}
  sortBy={sortBy}
  setSortBy={setSortBy}
/>
      <div className="mt-4">
  <StockPagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />
</div>
    </Container>
  );
}

export default Home;