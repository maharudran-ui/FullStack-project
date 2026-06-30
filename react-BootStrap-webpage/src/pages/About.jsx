import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AboutImg from "../assets/images/Aboutimg.png";
import AboutImg2 from "../assets/images/Aboutimg2.png";
// import products from "../data/products";
import ProductGrid from "../components/product/ProductGrid";
import "../styles/About.css";
import { useState, useEffect } from "react";
import api from "../services/api";




function About() {

  
const [products, setProducts] = useState([]);
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
  return (
    <div className="about-page">
      <Container className="about-container">

        <Row className="align-items-center gy-4">
          <Col xs={12} md={6} className="pe-md-5">
            <h1 className="about-main-heading">
            </h1>
            <p className="about-paragraph mb-3">
              Get ready to explore a treasure trove of hidden gems that have been carefully
              sourced from around the world.
            </p>
            <p className="about-paragraph">
              Whether you're a seasoned collector or a newcomer to the collectors' world,
              this is your chance to find that perfect piece to elevate your collection.
            </p>

          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <div className="about-image-wrapper">
              <img src={AboutImg} alt="Vintage treasure map layout with stamps and coins"  className="about-main-image"/>
            </div>
          </Col>
        </Row>

        
        <Row className="align-items-center second-about-section gy-5">
          <Col xs={12} md={5} className="d-flex justify-content-center">
            <div className="owner-image-wrapper">
              <div className="top-brown-box"></div>
              <div className="bottom-brown-box"></div>
              <div className="owner-image-frame">
                <img src={AboutImg2} alt="David Druett" className="owner-image"/>
              </div>
            </div>
          </Col>

        
          <Col xs={12} md={7}>
            <div className="ps-md-4">
              <h3 className="owner-name">
                Mr David N Druett
              </h3>

              <h2 className="owner-title">
                - Pennymead owner
              </h2>

              <p className="owner-description">
                I am pleased to introduce myself to you. I have now been
                running Pennymead Books for 41 years and created my own
                website back in 2002. While my contemporaries are retiring
                I am happy to still be running this business which I love.
              </p>

            </div>

          </Col>

        </Row>

        {/* COLLECTABLES SECTION */}
        <div className="collectables-section">

          <h2 className="collectables-heading">
            Collectables
          </h2>
          <ProductGrid products={latestProducts} />
        </div>
      </Container>

    </div>
  );
}

export default About;