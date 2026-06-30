import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoriesBar from "../components/common/CategoriesBar";
import CartItem from "../components/cart/CartItem";
import ProductGrid from "../components/product/ProductGrid";
import products from "../data/products";
import api from "../services/api";
import "../styles/cart.css";

function Cart() {
  const navigate = useNavigate();
  const formRef = useRef();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [activeCategory, setActiveCategory] = useState("");

  const handleContinue = async (e) => {
    e.preventDefault();
    console.log("BUTTON CLICKED"); 

    try {
      const form = formRef.current;


cartItems.forEach(item => {
    console.log(item);
    console.log("Price:", item.price);
    console.log("Quantity:", item.quantity);
});
      const orderData = {
        email: form.email.value,
        name: form.name.value,
        address1: form.address1.value,
        address2: form.address2.value,
        city: form.city.value,
        phone: form.phone.value,
        state: form.state.value,
        zip: form.zip.value,
        country: form.country.value,
        payment_method: form.payment_method.value,
        notes: form.notes.value,
        

        items: cartItems,
        total_price: cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
          
        ),
        
      };
   
console.log("Cart Items:", cartItems);
console.log("Order Data:", orderData);
    await api.post("/orders/add", orderData)
  .then(res => console.log("SUCCESS", res))
  .catch(err => console.log("API ERROR", err.response?.data || err));

      alert("Order placed successfully");

      navigate("/order");
    } catch (err) {
      console.log(err);
      alert("Order failed");
    }
  };

  return (
    <div className="cart-page">
      <Container>
        <div className="cart-categories-section">
          <CategoriesBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your shopping basket is empty.</h3>
          </div>
        ) : (
          <Row className="g-4">
            {/* LEFT CART ITEMS */}
            <Col lg={8} md={7} xs={12}>
              <div className="cart-left-box">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </Col>

            {/* RIGHT FORM */}
            <Col lg={4} md={5} xs={12}>
              <div className="checkout-box">
                <h3 className="details-title">Your details</h3>

                <Form ref={formRef} onSubmit={handleContinue}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control type="email" name="email" required />
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Control placeholder="Name" name="name" required />
                    </Col>
                  </Row>

                  <Form.Control
                    className="mt-2"
                    placeholder="Address line 1"
                    name="address1"
                    required
                  />

                  <Form.Control
                    className="mt-2"
                    placeholder="Address line 2"
                    name="address2"
                  />

                  <Form.Control className="mt-2" placeholder="City" name="city" required />

                  <Form.Control className="mt-2" placeholder="Phone" name="phone" required />

                  <Form.Control className="mt-2" placeholder="State" name="state" required />

                  <Form.Control className="mt-2" placeholder="Zip" name="zip" required />

                  <Form.Select className="mt-2" name="country" required>
                    <option value="">Select Country</option>
                    <option>India</option>
                    <option>USA</option>
                    <option>UK</option>
                  </Form.Select>

                  <Form.Select className="mt-2" name="payment_method" required>
                    <option value="">Payment Method</option>
                    <option>Cash</option>
                    <option>Card</option>
                  </Form.Select>

                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="mt-2"
                    placeholder="Notes"
                    name="notes"
                  />

                  <Button type="submit" className="continue-btn mt-3">
                    Continue
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        )}

        {cartItems.length > 0 && (
          <div className="collectables-section">
            <h2 className="collectables-title">Collectables</h2>
            <ProductGrid products={products} />
          </div>
        )}
      </Container>
    </div>
  );
}

export default Cart;