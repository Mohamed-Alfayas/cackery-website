// import React from 'react'
import "./Banner.scss";
import { Col, Row } from 'react-bootstrap';

const Banner = () => {
  return (
    <section className="banner-section">
      <Row>
        <Col md={8} xs={8} className="left">
          <h1>
            Get the Best Deals On Customized Cakes <br></br>
            <span>Flat 15%</span>
          </h1>
          <p className="banner-button">Order Now</p>
        </Col>
        <Col md={4} xs={4}>
          <img
            className="banner-image"
            src={require("../../assets/images/banner-offer-1.png")}
          />
        </Col>
      </Row>
    </section>
  )
}

export default Banner
