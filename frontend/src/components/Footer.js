import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Newsletter from "./Newsletter";
import { Form, Button } from "react-bootstrap";

const Footer = () => {
  const infoLinks = [
    { id: 0, name: "Contact Us", to: "/contact" },
    { id: 1, name: "Sell With Us", to: "/sellwithus" },
  ];

  const footerLinks = infoLinks.map((item) => (
    <li key={item.id} className="footer-link">
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ));

  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          <Col className="footer-block">
            <div className="block-title">
              <h2>Customer Service</h2>
            </div>
            <div className="block-content">
              <ul>{footerLinks}</ul>
            </div>
          </Col>
          <Col className="footer-block">
            <div className="block-title">
              <h2>Links</h2>
            </div>
            <div className="block-content">
              <ul>{footerLinks}</ul>
            </div>
          </Col>
          <Col className="footer-block">
            <div className="block-title">
              <h2>Newsletter</h2>
              <Newsletter />
            </div>

            <Row style={{margin:"0.6rem 0.9rem"}}>
              <ul className="footer-social-item">
                <li>
                  <a
                    href="/#facebook"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <i class="fab fa-facebook-square"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="/#instagram"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <i class="fab fa-instagram-square"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="/#pinterest"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    <i class="fab fa-pinterest-square"></i>
                  </a>
                </li>
                <li>
                  <a href="/#twitter" rel="noreferrer noopener" target="_blank">
                    <i class="fab fa-twitter-square"></i>
                  </a>
                </li>
              </ul>
            </Row>
          </Col>
        </Row>
      </Container>
      <Row className="footer-copyright">MernShop by @arefeh_htmi</Row>
    </footer>
  );
};

export default Footer;
