import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../../styles/Footer.css";
import FooterImg from "../../assets/images/FooterImg2.png";
import PaymentImg from "../../assets/images/Footerimg.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <Container>
        <Row className="align-items-center justify-content-between gy-4 pb-4">
          <Col xs={6} md={4} className="d-flex justify-content-center justify-content-md-start order-1">
            <div className="footer-payment-box">
              <img src={PaymentImg} alt="Payment Methods"className="footer-payment-image"/>
            </div>
          </Col>

         
          <Col xs={12} md={4} className="text-center text-white order-3 order-md-2 mt-4 mt-md-0">
            <h3 className="footer-title d-none d-md-block">
              PENNYMEAD.COM
            </h3>
            <div>
              <p className="footer-follow-text">
                Follow us on
              </p>

              <a href="https://facebook.com" target="_blank" rel="noreferrer"className="footer-facebook-icon">
                <FaFacebookF size={16} />
              </a>
            </div>
          </Col>

       
          <Col xs={6} md={4} className="d-flex justify-content-center justify-content-md-end order-2 order-md-3">
            <div className="footer-trustpilot-box">
              <div className="d-flex justify-content-center gap-2 mb-2 pt-1">
                <img src={FooterImg} alt="Footer Icon" className="footer-trustpilot-image"/>
              </div>

              <div className="footer-trustpilot-text">
                <span className="footer-star">
                  ★
                </span>
                Trustpilot
              </div>

              <a href="https://www.trustpilot.com" target="_blank" rel="noreferrer" className="footer-trustpilot-link">
                Trustpilot
              </a>
            </div>
          </Col>
        </Row>
      
        <Row className="pt-3 border-top border-light border-opacity-25">
          <Col className="text-center">
            <div className="footer-bottom-links">
              <span>
                Copyright © {currentYear}, Pennymead
              </span>
              <span>|</span>

              <span>
                All Rights Reserved
              </span>

              <span className="d-block d-sm-none w-100 my-0"></span>

              <span className="d-none d-sm-inline">
                |
              </span>

              <Link to="/terms" className="footer-link">
                Terms & Conditions
              </Link>

              <span>|</span>

              <Link to="/privacy" className="footer-link">
                Privacy Policy
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}