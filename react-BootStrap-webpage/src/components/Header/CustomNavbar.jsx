import { useState } from "react";
import { Navbar,Container,Nav,Button,Offcanvas} from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaShoppingCart,FaTh,FaHome,FaInfoCircle,FaBoxOpen,FaPhoneAlt,FaFacebookF,FaChevronRight} from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../styles/Navbar.css";

function CustomNavbar() {

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const [showSidebar, setShowSidebar] =
    useState(false);

  return (
    <>

      <Navbar expand="md" className="py-3 custom-navbar">
        <Container className="d-flex align-items-center justify-content-between">
          
          <Navbar.Brand as={Link} to="/" className="logo-text m-0">
            PENNYMEAD.COM
          </Navbar.Brand>

         
          <Nav className="d-none d-md-flex mx-auto gap-2 nav-links">
            <Nav.Link as={Link} to="/">
              Home |
            </Nav.Link>

            <Nav.Link as={Link} to="/about">
              About Us |
            </Nav.Link>

            <Nav.Link as={Link} to="/track-order">
              Track Order |
            </Nav.Link>

            <Nav.Link as={Link} to="/contactUs">
              Contact Us
            </Nav.Link>

          </Nav>

          
          <div className="d-flex align-items-center gap-2">

            {/* MOBILE CART */}
            <Button as={Link} to="/cart" className="basket-btn d-flex d-md-none align-items-center justify-content-center">

              <FaShoppingCart />

              {cartItems?.length > 0 && (
                <span className=" cart-badge">
                  {cartItems.length}
                </span>
              )}

            </Button>

            {/* TABLET/DESKTOP CART */}
         
{/* TABLET/DESKTOP CART */}
<Button
  as={Link}
  to="/cart"
  className="tablet-basket-btn d-none d-md-flex d-lg-none align-items-center justify-content-center position-relative"
>
  <FaShoppingCart />

  {cartItems?.length > 0 && (
    <span className="cart-badge">
      {cartItems.length}
    </span>
  )}
</Button>

{/* DESKTOP BUTTON */}
<Button
  as={Link}
  to="/cart"
  className="desktop-basket-btn d-none d-lg-flex align-items-center gap-2 position-relative"
>
  <FaShoppingCart />

  View Basket

  {cartItems?.length > 0 && (
    <span className="cart-badge">
      {cartItems.length}
    </span>
  )}
</Button>
            {/* MOBILE TOGGLE */}
            <Button onClick={() => setShowSidebar(true)} className="custom-toggler-btn d-md-none border-0 p-0">

              <div className="toggler-circle-btn d-flex align-items-center justify-content-center">
                <FaTh />
              </div>
            </Button>
          </div>

          {/* MOBILE SIDEBAR */}
          <Navbar.Offcanvas  show={showSidebar}  onHide={() => setShowSidebar(false)} placement="end" className="custom-sidebar-drawer d-md-none">

            <Offcanvas.Header className="custom-sidebar-header">

              <button type="button" className="sidebar-close-arrow-btn" onClick={() => setShowSidebar(false)}>
                <FaChevronRight size={16} />
              </button>

              <Offcanvas.Title className="text-white logo-text-sidebar m-0">
                PENNYMEAD.COM
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="d-flex flex-column">

              <Nav className="gap-3">

                <Nav.Link as={Link} to="/"className="sidebar-link">

                  <span className="icon-circle">
                    <FaHome />
                  </span>

                  <span className="link-text"> Home</span>

                </Nav.Link>

                <Nav.Link as={Link} to="/about" className="sidebar-link">

                  <span className="icon-circle">
                    <FaInfoCircle />
                  </span>

                  <span className="link-text">
                    About Us
                  </span>

                </Nav.Link>

                <Nav.Link as={Link} to="/track-order" className="sidebar-link">

                  <span className="icon-circle">
                    <FaBoxOpen />
                  </span>

                  <span className="link-text">
                    Track Order
                  </span>
                </Nav.Link>

                <Nav.Link as={Link}  to="/contactUs" className="sidebar-link">

                  <span className="icon-circle">
                    <FaPhoneAlt />
                  </span>
                  <span className="link-text">
                    Contact Us
                  </span>
                </Nav.Link>
              </Nav>

             
              <div className="sidebar-footer text-center mt-auto">
                <hr className="footer-line mx-auto" />
                <p className="text-white footer-title">
                  Follow us on
                </p>

                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="fb-icon-link">
                  <FaFacebookF size={20} />
                </a>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <hr className="custom-line m-0" />

    </>
  );
}

export default CustomNavbar;