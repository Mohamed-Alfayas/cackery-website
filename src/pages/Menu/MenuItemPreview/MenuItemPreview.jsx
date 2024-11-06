import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "./MenuItemPreview.scss";
import { Box, Typography, Button, Grid, TextField, Breadcrumbs, Link, IconButton, MenuItem, Select, FormControl, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from 'react-router-dom';
import { addToCartApi, getMenuApi } from "../../../utils/cakeryAPI";
import ProductSlider from "../../../component/product-slider/ProductSlider";
import { DataContext } from "../../../context/DataContext";
import { showToast } from "../../../component/common/ToastAlert";
import ImageMagnifier from "./ImageMagnifier";
import AuthModal from "../../Auth/AuthModal";

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

function MenuItemPreview() {

  const navigate = useNavigate();

  const { id } = useParams();
  const { accessToken, setIsPreloaderShow, getUserProfile } = useContext(DataContext);

  const [menuItemDetails, setMenuItemDetails] = useState(null);
  const [sliderImageLength, setSliderImageLength] = useState(null);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [customizationFormError, setCustomizationFormError] = useState({});

  const getItemDetails = async () => {
    try {
      const getCakeAPIResponse = await getMenuApi(id);
      setMenuItemDetails(getCakeAPIResponse?.data);
      setSliderImageLength(getCakeAPIResponse?.data?.images?.length)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      await getItemDetails();
    };

    fetchApi();
  }, []);

  const [formData, setFormData] = useState({
    type: "",
    person_name: "",
    delivery_date: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateFiled(name, value);
  };

  const validateFiled = (name, value) => {
    let error = "";

    if (!value) {
      error = "This field is required";
    }

    setCustomizationFormError((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const errors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        errors[key] = "This field is required";
      }
    }
    setCustomizationFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCakePrice, setSelectedCakePrice] = useState('');
  const [selectedCakeDiscountPercentge, setSelectedCakeDiscountPercentge] = useState(null);

  useEffect(() => {
    if (menuItemDetails?.price_list?.length > 0) {
      setSelectedWeight(menuItemDetails.price_list[0]?.kg);
      setSelectedPrice(menuItemDetails.price_list[0]?.cake_price_after_offer);
      setSelectedCakePrice(menuItemDetails.price_list[0]);
      setSelectedCakeDiscountPercentge(menuItemDetails.price_list[0]?.offer_percentage?.[0])
    }
  }, [menuItemDetails]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prevFormData => ({ ...prevFormData, delivery_date: today }));
  }, []);

  const handleWeightSelection = (price) => {
    setSelectedWeight(price?.kg);
    setSelectedPrice(price?.cake_price_after_offer);
    setSelectedCakePrice(price);
    setQuantity(1);
  };

  const handleQuantityChange = (operation) => {
    setQuantity((prevQuantity) =>
      operation === "increase"
        ? prevQuantity + 1
        : Math.max(1, prevQuantity - 1)
    );
  };

  const handleSubmitAddCart = async () => {
    if (!validateForm()) {
      return;
    }

    let requestData = {
      "id": 0,
      "cake_price": selectedCakePrice?.id,
      "price": selectedPrice,
      "qty": quantity,
      "type": formData?.type,
      "date": formData?.delivery_date,
      "greeting_text": formData?.message,
      "person_name": formData?.person_name,
    };

    try {
      setIsPreloaderShow(true);
      const addToCartApiResponse = await addToCartApi(requestData);
      await getUserProfile();
      showToast('Item added to cart!...');
      setTimeout(() => {
        navigate("/cart");
      }, 10);
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
      console.error(error);
    } finally {
      setIsPreloaderShow(false);
    }
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: menuItemDetails ? (sliderImageLength < 6 ? sliderImageLength : 6) : 6,
    // slidesToShow: 6,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current, next) => setActiveSlideIndex(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const [isLoginShow, setIsLoginShow] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this amazing bakery!",
          text: 'I found this great bakery with delicious cakes. Check out the link below!',
          url: window.location.href,
        });
        console.log('Page shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      showToast('Web Share API is not supported in your browser.', 'info');
    }
  };

  return (
    <>
      <div className="cake-menu-item-view">
        <Grid container className="px-1">
          <Grid item xs={12} sm={7} className="h-full">

            <Grid container className="px-1 h-full cake-slider-left">
              <Grid item xs={3} sm={2} className="px-0 mr-1 h-full slider-container">

                <Slider {...settings}>
                  {menuItemDetails ? (
                    menuItemDetails?.images?.map((image, index) => (
                      <div key={index} className="cakeslider-img">
                        <img src={image?.url} alt={`Slide ${index}`} />
                      </div>
                    ))
                  ) : (
                    Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton key={index} variant="rectangular" className="cakeslider-img" height={"65px"} width={"65px"} sx={{ borderRadius: "10px", width: "65px !important", margin: 'auto' }} />
                    ))
                  )}
                </Slider>

              </Grid>
              <Grid item xs={9} sm={9} className="px-0 h-full">
                {menuItemDetails?.images?.[activeSlideIndex]?.url ?
                  (
                    <ImageMagnifier
                      src={menuItemDetails?.images?.[activeSlideIndex]?.url}
                      alt="Descriptive text"
                      zoom={5} // Adjust zoom level as needed
                      className="cakecontent-img"
                    />
                  // <img
                  //   src={menuItemDetails?.images?.[activeSlideIndex]?.url}
                  //   alt={`Active Slide`}
                  //   className="cakecontent-img"
                  // /> 
                ):
                  <Skeleton variant="rectangular" className="cakecontent-img" />}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5} className="cake-menu-info">
            <div className="breadcrumbs-section d-none d-lg-block">
              <Breadcrumbs
                separator={<FontAwesomeIcon icon={faChevronRight} />}
                aria-label="breadcrumb"
              >
                <Link underline="hover" key="1" color="inherit" href="/">
                  Home
                </Link>
                <Link underline="hover" key="1" color="inherit" href="/">
                  Menu
                </Link>
                <Typography key="3" color="text.primary">
                  {menuItemDetails ? menuItemDetails?.main_category?.name : <Skeleton animation="wave" width={"100px"} />}
                </Typography>
              </Breadcrumbs>
            </div>
            <Typography className="mb-1 cake-category">
              {menuItemDetails ? menuItemDetails?.sub_category?.name : <Skeleton animation="wave" width={"40%"} />}
            </Typography>
            <Typography className="mb-1 cake-name">
              {menuItemDetails ? menuItemDetails?.name : <Skeleton animation="wave" width={"60%"} />}
            </Typography>
            <Typography className="my-1 cake-price">
              {menuItemDetails ? (<><span className="rs-symbol rs-font">₹</span> {selectedPrice * quantity}</>) : <Skeleton animation="wave" width={"40%"} />}
              {selectedCakeDiscountPercentge && <span className="original-price">₹{selectedCakePrice?.price}</span>}
            </Typography>
            <Typography className="mb-1 cake-content">
              {menuItemDetails ? menuItemDetails?.description : <Skeleton animation="wave" height={"100px"} />}
            </Typography>
            <Grid container spacing={2}>
              <Grid item md={9} xs={12}>
                {/* {menuItemDetails?.unit?.is_variant && ( */}
                  <div>
                    <Typography className="weight cake-form-label mb-2">Select Variant</Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        {menuItemDetails ? menuItemDetails?.price_list?.map((price, index) => (
                          <Button
                            key={index}
                            variant="outlined"
                            className={`order-button cake-kg-button ${selectedWeight === price.kg ? 'active' : ''}`}
                            onClick={() => { handleWeightSelection(price) }}
                          >
                            {`${price?.kg}`} {menuItemDetails?.unit?.name}
                          </Button>
                        )) :
                          <Skeleton animation="wave" className="order-button" width={"120px"} height="60px" />}
                      </Box>
                    </Box>
                  </div>
                {/* )} */}
              </Grid>
              <Grid item md={3} xs={12}>
                <div>
                  <Typography className="me-1 Qty cake-form-label mb-2">Select Qty</Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box sx={{ display: "flex", alignItems: "center" }} className="quantity-section">
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

            {/* {menuItemDetails?.unit?.is_variant && ( */}
              <>
              <Typography className="customization title">Customization</Typography>
              <Box>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <Typography variant="caption" className="input-label">Type Of Occasion</Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.type}
                        name="type"
                        onChange={handleInputChange}
                      >
                        <MenuItem value={"Birthday"}>Birthday</MenuItem>
                        <MenuItem value={"Marriage Anniversary"}>Marriage Anniversary</MenuItem>
                        <MenuItem value={"Work Anniversary"}>Work Anniversary</MenuItem>
                      </Select>
                      {customizationFormError.type && (
                        <Typography variant="caption" color="error">
                          {customizationFormError.type}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="caption" className="input-label">Event Date</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      name="delivery_date"
                      value={formData?.delivery_date}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {customizationFormError.delivery_date && (
                      <Typography variant="caption" color="error">
                        {customizationFormError.delivery_date}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <Typography variant="caption" className="input-label">Special Person Name</Typography>
                    <TextField
                      fullWidth
                      size={"small"}
                      name="person_name"
                      value={formData.person_name}
                      onChange={handleInputChange}
                    />
                    {customizationFormError.person_name && (
                      <Typography variant="caption" color="error">
                        {customizationFormError.person_name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="caption" className="input-label">Greetings Message</Typography>
                    <TextField
                      fullWidth
                      size={"small"}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                    {customizationFormError.message && (
                      <Typography variant="caption" color="error">
                        {customizationFormError.message}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
              </>
            {/* )} */}

              <Grid container spacing={2} className="mt-1">
                <Grid item md={6} xs={6}>
                  <Button variant="outlined" className="order share-button" onClick={() => {
                    handleShare()
                  }}>
                    Share
                    <MdIosShare className="share" />
                  </Button>
                </Grid>
                <Grid item md={6} xs={6}>
                  {accessToken ? (
                    <Button variant="outlined" className="order add-cart-button"
                      onClick={() => {
                        handleSubmitAddCart()
                      }}
                    >
                      Add to Cart
                      <FaArrowRight className="rightarrow" />
                    </Button>) : 
                    (<Button variant="outlined" className="order add-cart-button"
                      onClick={() => {
                        setIsLoginShow(true)
                      }}
                    >
                      Sign In to Add Cart
                      <FaArrowRight className="rightarrow" />
                    </Button>)}
                </Grid>
              </Grid>
              
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="mt-5">
        <h1 className="heading category-title">Recommended Product</h1>
        <ProductSlider />
      </div>
      <AuthModal show={isLoginShow} setShow={setIsLoginShow} />
    </>
  );
}

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};
NextArrow.propTypes = {
  onClick: PropTypes.func,
};

export default MenuItemPreview;
