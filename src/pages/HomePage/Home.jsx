
import "./Home.scss";
import { Col, Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography, styled } from "@mui/material";
// import MultipleItems from "./Slider";
import introCakeImage from '../../assets/images/intro-cake.png';
import aboutCakeImage from '../../assets/images/about-cake.png';
import aboutCupcakeImage from '../../assets/images/about-cupcake.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router";
import ProductSlider from "../../component/product-slider/ProductSlider";

const Home = () => {

  const { cakeObj, subCategoriesObj } = useContext(DataContext);

  const navigate = useNavigate();

  let desc = "Our tender coconut cake is crafted with fresh coconut flakes, velvety cake layers, and a hint of tropical sweetness, creating a blissful dessert that delights the palate.";

  const feedback = [
    {
      id: 1,
      content: 'OHHHH Thanks god !!!! Finally there is someone making it for me to use on my projects. Love ya 😍😍😍😍😍😍',
      name: 'Jane Copper',
      image: require('../../assets/images/feedback-user.png')
    },
    {
      id: 2,
      content: 'OHHHH Thanks god !!!! Finally there is someone making it for me to use on my projects. Love ya 😍😍😍😍😍😍',
      name: 'Jane Copper',
      image: require('../../assets/images/feedback-user.png')
    },
    {
      id: 3,
      content: 'OHHHH Thanks god !!!! Finally there is someone making it for me to use on my projects. Love ya 😍😍😍😍😍😍',
      name: 'Jane Copper',
      image: require('../../assets/images/feedback-user.png')
    },
    {
      id: 4,
      content: 'OHHHH Thanks god !!!! Finally there is someone making it for me to use on my projects. Love ya 😍😍😍😍😍😍',
      name: 'Jane Copper',
      image: require('../../assets/images/feedback-user.png')
    },
    {
      id: 5,
      content: 'OHHHH Thanks god !!!! Finally there is someone making it for me to use on my projects. Love ya 😍😍😍😍😍😍',
      name: 'Jane Copper',
      image: require('../../assets/images/feedback-user.png')
    },
    {
      id: 6,
      content: 'OHHHH Thanks god !!!! Finally there is someone making it for me to use on my projects. Love ya 😍😍😍😍😍😍',
      name: 'Jane Copper',
      image: require('../../assets/images/feedback-user.png')
    },
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const StyledImage = styled('img')(() => ({
    borderRadius: 25,
    width: '100%',
    maxWidth: 350,
    height: 'auto',
  }));


  return (
    <>
      {/* home-introduction */}
      <section className="home-introduction">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 4, mb: 4 }}
        >
          <Grid item md={8} className="d-flex align-items-center">
            <Box>
              <Box className="home-banner-image-sm" sx={{ my: 2 }}>
                <img src={introCakeImage} alt="Intro Cake" />
              </Box>
              <Typography variant="h1" className="title">
                Treat Yourself to a World of Delectable Cakes at{" "}
                <Box component="span" className="text-theme">
                  <br />
                  Our Bakery
                </Box>
              </Typography>

              <Typography
                variant="body1"
                className="description"
                sx={{ mt: 2 }}
              >
                Indulge in our bakery&apos;s decadent cakes, meticulously
                crafted with passion. From classic favorites to innovative
                creations, each moist and flavorful bite will leave you craving
                more. With stunning presentation and exceptional quality, our
                cakes are the centerpiece of any celebration. Step into our
                sugary world and surrender to pure cake ecstasy.
              </Typography>
              <Button
                variant="contained"
                className="home-page-explore-button"
                sx={{ mt: 2 }}
              >
                Explore Cakes
              </Button>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box
              className="slider-image-desktop"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <StyledImage src={introCakeImage} alt="Intro Cake" />
            </Box>
          </Grid>
        </Grid>
      </section>

      {/* featured Categories */}
      <section className="featured-category">
        <div>
          <Box>
            <Typography
              variant="h4"
              className="heading category-title"
              gutterBottom
            >
              Our Featured Categories
            </Typography>
            <Typography variant="body1" className="description">
              Discover the joy of our Classic Cakes, where timeless flavors
              delight your taste buds, and indulge in our Exquisite Custom
              Cakes, tailor-made masterpieces that create unforgettable
              memories.
            </Typography>
          </Box>
          <Container className="category-bottom">
            <Grid container spacing={4}>
              {subCategoriesObj.map((data) => (
                <Grid
                  key={data?.id}
                  item
                  xs={6}
                  sm={3}
                  md={3}
                  lg={2.4}
                  className="item"
                >
                  <Card className="category-card">
                    <CardMedia
                      component="img"
                      image={data?.image_url}
                      // alt={data?.name}
                    />
                    <CardContent className="category-info">
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="cake-price"
                      >
                         <span className="rs-font">₹</span>{`${data?.starting_price || "750"}`}/Kg
                      </Typography>
                      <Typography variant="body1" className="cake-name">
                        {data?.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </section>

      <section className="about-section">
        <Grid container spacing={2}>
          <Grid item md={4} className="about-image">
            <StyledImage src={aboutCakeImage} alt="About Cake" />
          </Grid>
          <Grid item md={8} sx={{ position: "relative", mt: 4 }} >
            <Typography
              variant="h1"
              className="heading category-title"
              gutterBottom
            >
              About MagilShe Cakery
            </Typography>
            <Box
              component="img"
              className="right-corner-image"
              src={aboutCupcakeImage}
              alt="About Cupcake"
            />
            <Typography variant="body1" className="description">
              At <span className="text-theme">Chennai Cakery</span>, we warmly
              welcome you to indulge in a delightful balance of flavors and
              sweetness. Our expert bakers skillfully craft each cake, ensuring
              a harmonious blend that will tantalize your taste buds. From
              luscious layers to heavenly frostings, our creations promise an
              exquisite experience that will leave you craving for more. Step
              into our world of culinary mastery and savor the perfect balance
              of cake perfection at Chennai Cakery.
            </Typography>
            <Box
              component="img"
              className="left-corner-image"
              src={aboutCakeImage}
              alt="About Cupcake"
            />
          </Grid>
        </Grid>
      </section>

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

      <section className="choose-favourite-cake-section">
        <Grid container spacing={0} className="m-0 w-100">
          <Grid item md={8} xs={12}>
            <h1 className="heading category-title">
              Choose Your Favorite Cake
            </h1>
            <p className="sub-heading">
              Discover the joy of our Classic Cakes, where timeless flavors
              delight your taste buds, and indulge in our Exquisite Custom
              Cakes, tailor-made masterpieces that create unforgettable
              memories.
            </p>
          </Grid>
          <Grid item md={4} xs={12}>
            <img
              className="heading-right"
              src={require("../../assets/images/fav-chocolate.png")}
            />
          </Grid>
        </Grid>
        
        <ProductSlider />
      </section>

      {/* Client Testimonials */}
      <section className="client-testimonial">
        <div>
          <h1 className="heading category-title">What Our Client Says</h1>
          <div className="image-bg">
            <img
              className="right-corner-image"
              src={require("../../assets/images/chocolate-piece.png")}
            />
            <img
              className="left-corner-image"
              src={require("../../assets/images/strawberry.png")}
            />
          </div>

          <Slider {...settings} className="feedback-slider">
            {feedback?.map((item) => {
              return (
                <div key={item?.id} className="slider-item">
                  <div className="item">
                    <span className="quote-symbol">{`"`}</span>
                    <p className="content">{item?.content}</p>
                    <div className="writer">
                      <img src={item?.image} />
                      <p
                        style={{
                          fontSize: 10,
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {item?.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
          <div className="image-bg"></div>
        </div>
      </section>
    </>
  );  
}

export default Home;
