
import "./AboutCakery.scss";
import { Row, Col } from "react-bootstrap";
import aboutCake from "../../assets/images/about-cake.png";
import aboutCupCake from "../../assets/images/about-cupcake.png";

const About = () => {
  return (
    <section className="about_cakery">
      <Row xs={1} md={2} className="wrapper">
        <Col className="left">
          <img src={aboutCake} alt="" />
        </Col>
        <Col className="right">
          <div className="top">
            <div className="title_section">
              <h4>About</h4>
             
            </div>
            <img src={aboutCupCake} alt="" />
          </div>
          <p className="desc">
            At <span>Chennai Cakery</span>, we warmly welcome you to indulge in
            a delightful balance of flavors and sweetness. Our expert bakers
            skillfully craft each cake, ensuring a harmonious blend that will
            tantalize your taste buds. From luscious layers to heavenly
            frostings, our creations promise an exquisite experience that will
            leave you craving for more. Step into our world of culinary mastery
            and savor the perfect balance of cake perfection at Chennai Cakery.
          </p>
        </Col>
      </Row>
    </section>
  );
};

export default About;
