import React, { useState } from "react";
import Slider from "react-slick";
import GalleryVector from "../../assets/images/Gallery/Vector1.png";
import "./CakeSlider.scss";
import { Box, Typography, Button, Grid, TextField, Breadcrumbs, Link, IconButton } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import { GoPlus } from "react-icons/go";
import { FaMinus } from "react-icons/fa6";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductSlider from "../../component/product-slider/ProductSlider";

const PrevArrow = ({ onClick }) => (
  <button className="slick-prev slick-arrow" onClick={onClick}>
    <FaChevronUp />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button className="slick-next slick-arrow" onClick={onClick}>
    <FaChevronDown />
  </button>
);

function CakeSlider() {

  const [formData, setFormData] = useState({
    name: "John Doe",
    phone: "",
    deliveryName: "John Doe",
    deliveryPhone: "",
    deliveryDate: "2023-05-28T15:00",
    city: "Nagorcoil",
    address: "2118 Thornridge Cir, Syracuse, Connecticut 35624",
  });

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    focusOnSelect: true,
    // centerMode:true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: function (currentSlide, nextSlide) {
      // console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      setActiveSlideUrl(currentSlide);
      // console.log("after change", currentSlide);
    },
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sliderImages = [
    require('../../assets/images/Gallery/Vector1.png'),
    require('../../assets/images/Gallery/Vector2.png'),
    require('../../assets/images/Gallery/Vector3.png'),
    require('../../assets/images/Gallery/Vector4.png'),
    require('../../assets/images/Gallery/Vector5.png'),
    require('../../assets/images/Gallery/Vector1.png'),
    require('../../assets/images/Gallery/Vector2.png'),
    require('../../assets/images/Gallery/Vector3.png'),
    require('../../assets/images/Gallery/Vector4.png'),
    require('../../assets/images/Gallery/Vector5.png'),
  ];

  const [activeSlideUrl, setActiveSlideUrl] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (operation) => {
    setQuantity((prevQuantity) =>
      operation === "increase"
        ? prevQuantity + 1
        : Math.max(1, prevQuantity - 1)
    );
  };

  return (
    <>
      <div className="cake-menu-item-view">

        <Grid container className="px-1">
          <Grid item xs={12} sm={7} className="h-full">
            <Grid container className="px-1 h-full cake-slider-left">
              <Grid item xs={4} sm={2} className="px-0 mr-1 h-full">
                <Slider {...settings}>
                  {sliderImages.map((image, index) => (
                    <div key={index} className="cakeslider-img">
                      <img src={image} alt={`Slide ${index}`} />
                    </div>
                  ))}
                </Slider>
              </Grid>
              <Grid item xs={7} sm={9} className="px-0 h-full">
                <img src={sliderImages[activeSlideUrl] || GalleryVector} className="cakecontent-img" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5} className="cake-menu-info">
            <div className="breadcrumbs-section">
              <Breadcrumbs
                separator={<FontAwesomeIcon icon={faChevronRight} />}
                aria-label="breadcrumb"
              >
                <Link
                  underline="hover"
                  key="1"
                  color="inherit"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  underline="hover"
                  key="1"
                  color="inherit"
                  href="/"
                >
                  Menu
                </Link>
                <Typography key="3" color="text.primary">
                  Choco Truffle
                </Typography>
              </Breadcrumbs>
            </div>
            <Typography className="mb-1 cake-category">Truffle Cake</Typography>
            <Typography className=" mb-1 cake-name">
              Chocholate Truffle
            </Typography>

            <Typography className="my-1 cake-price"><span className="rs-symbol rs-font">₹</span> 1450</Typography>
            <Typography className="mb-1 cake-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              nulla assumenda ea nostrum magni harum. Facere consequatur mollitia
              possimus minima et officiis, asperiores quis cumque quia corrupti
              eius quo eveniet.
            </Typography>
            {/* <Box className="mb-1" display="flex">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <span className="star">4.5</span>
          </Box> */}
            <Grid container spacing={2}>
              <Grid item md={9} xs={12}>
                <div>
                  <Typography className="weight cake-form-label">Select Weight</Typography>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Button variant="outlined" className="order-button cake-kg-button active">
                        500g
                      </Button>
                      <Button
                        variant="outlined"
                        className="mx-2 order-button cake-kg-button"
                      >
                        1kg
                      </Button>
                      <Button
                        variant="outlined"
                        className="order-button cake-kg-button"
                      >
                        2kg
                      </Button>
                    </Box>
                  </Box>
                </div>
              </Grid>
              <Grid item md={3} xs={12}>
                <div>
                  <Typography className="me-1 Qty cake-form-label">Select Qty</Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center" }}
                      className="quantity-section"
                    >
                      <IconButton onClick={() => handleQuantityChange("decrease")}>
                        <FontAwesomeIcon icon={faMinus} />
                      </IconButton>
                      <TextField
                        value={quantity}
                        inputProps={{ readOnly: true }}
                        size="small"
                        className="cake-quantity-input"
                      />
                      <IconButton onClick={() => handleQuantityChange("increase")}>
                        <FontAwesomeIcon icon={faPlus} />
                      </IconButton>
                    </Box>

                  </Box>
                </div>
              </Grid>
            </Grid>

            <div className="cake-customization">
              <Typography className="customization title">Customization</Typography>
              <Box>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <Typography variant="caption" className="input-label">Type Of Occasion</Typography>
                    <TextField
                      fullWidth
                      size={"small"}
                      // label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Typography variant="caption" className="input-label">Event Date</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="datetime-local"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <Typography variant="caption" className="input-label">Special Person Name</Typography>
                    <TextField
                      fullWidth
                      size={"small"}
                      // label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Typography variant="caption" className="input-label">Greetings Message</Typography>
                    <TextField
                      fullWidth
                      size={"small"}
                      // label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} className="mt-1">
                  <Grid item md={6}>
                    <Button variant="outlined" className="order share-button">
                      Share
                      <MdIosShare className="share" />
                    </Button>
                  </Grid>
                  <Grid item md={6}>
                    <Button variant="outlined" className="order add-cart-button">
                      Add to Cart
                      <FaArrowRight className="rightarrow" />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Grid>
        </Grid>

      </div>
      <div className="mt-5">
        <h1 className="heading category-title">Recommended Product</h1>
        <ProductSlider />
      </div>
    </>
  );
}

PrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
NextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
export default CakeSlider;
