import React, { useEffect, useState, useMemo, useContext } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Divider,
  Checkbox,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import "./Cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCartApi, createAddressApi, updateOrderApi, getCartApi, removeCartApi, getAddressApi } from "../../utils/cakeryAPI";
import {
  faArrowRight,
  faMinus,
  faPlus,
  faPlusCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router";
import { showToast } from "../../component/common/ToastAlert";

const Cart = () => {
  const navigate = useNavigate();

  const [cartListApi, setCartListApi] = useState([]);

  const { customerAddressObj, setIsPreloaderShow, setCustomerAddressObj, userProfileInfo, getUserProfile } = useContext(DataContext);

  const deliveryCharge = 0; // Assuming free delivery

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    deliveryName: "",
    deliveryPhone: "",
    deliveryDate: "",
    city: "",
    address: "",
  });

  const initialData = useMemo(() => ({
    id: 0,
    title: "",
    address: "",
    city: "",
    pincode: "",
  }), []);

  const [addressData, setAddressData] = useState(initialData)
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [selectedAddressID, setSelectedAddressID] = useState(null);
  const [errors, setErrors] = useState({});
  const [addressErrors, setAddressErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchAddresses = async () => {
    try {
      const response = await getAddressApi();
      setCustomerAddressObj(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getCartList = async () => {
    try {
      const getCartAPIResponse = await getCartApi();
      const cartData = getCartAPIResponse?.data || [];
      setCartListApi(cartData);
      const initialQuantities = {};
      cartData.forEach(item => {
        initialQuantities[item.id] = 1;
      });
    } catch (error) {
      console.error(error);
    }
  }; 

  useEffect(() => {
    getCartList();
    fetchAddresses();
  }, []);

  const validateField = (name, value) => {
    let error = "";

    if (!value) {
      error = "This field is required";
    } else if ((name === "phone" || name === "deliveryPhone") && !/^\d{10}$/.test(value)) {
      error = "Phone number must be exactly 10 digits";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      validateField(name, value);
      return newFormData;
    });
  };

  useEffect(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localISOTime = new Date(now.getTime() - offset * 60000).toISOString().slice(0, 16);
    setFormData(prevFormData => ({ ...prevFormData, deliveryDate: localISOTime }));
  }, []);

  const handleSubmitOrder = async () => {
    const requiredFields = ['deliveryName', 'deliveryPhone', 'deliveryDate', 'city', 'address'];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    setErrors(newErrors);

    let cartIDList = cartListApi.map(cart => cart.id);

    if (cartIDList.length === 0) {
      showToast("Cart is Empty", "warning");
      return;
    }
    if (!formData?.deliveryName) {
      showToast("Please enter the delivery name", "warning");
      return;
    }
    if (!formData?.deliveryDate) {
      showToast("Please select a delivery date", "warning");
      return;
    }
    if (!selectedAddressID) {
      showToast("Please select a delivery address", "warning");
      return;
    }

    let requestData = {
      id: 0,
      cart_id_list: cartIDList,
      total_amount: totalPrice,
      total_qty: cartIDList?.length,
      delivery_person_name: formData?.deliveryName,
      delivery_person_phone: formData?.deliveryPhone,
      delivery_person_email: "",
      delivery_date_time: formData?.deliveryDate,
      customer_address_id: selectedAddressID,
      tracking_link: "",
    };

    try {
      setIsPreloaderShow(true);
      const updateOrderApiResponse = await updateOrderApi(requestData);
      await getUserProfile();
      showToast("Order Completed Successfully");
      setTimeout(() => {
        navigate("/orders");
      }, 10);
    } catch (error) {
      showToast('Failed to complete the order', 'error');
      console.error(error);
    } finally {
      setIsPreloaderShow(false);
    }
  };

  const calculateTotalPrice = () => {
    return cartListApi.reduce((total, item) => total + item?.price * item?.qty, 0);
  };

  const totalPrice = calculateTotalPrice();

  const handleSelectAddress = (address) => {
    setSelectedAddressID(address?.id);
    setSelectedAddress(address);
    setShowAddressForm(false);
  };

  const handleAddAddress = async () => {
    const requiredFields = ["title", "address", "city", "pincode"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!addressData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setAddressErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      let requestData = {
        id: editAddressId || 0,
        is_primary: false,
        ...addressData,
      };

      try {
        const createAddressApiResponse = await createAddressApi(requestData);
        setEditAddressId(null);
        setAddressData(initialData);
        setIsAddressEdit(false);
        await fetchAddresses();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditAddress = (address) => {
    setAddressData(address);
    setEditAddressId(address.id);
    setShowAddressForm(true);
    setIsAddressEdit(true);
  };

  const handleQuantityChange = async (id, operation) => {
    try {
      setIsPreloaderShow(true);

      const CartItem = cartListApi.find((cart) => cart.id === id);
      let requestData = {
        id: CartItem?.id,
        cake_price: CartItem?.cake_price_id,
        price: CartItem?.price,
        qty: operation === "increase" ? CartItem?.qty + 1 : Math.max(1, CartItem?.qty - 1),
        type: CartItem?.occasion_type,
        date: CartItem?.occasion_date,
        greeting_text: CartItem?.greeting_text,
        person_name: CartItem?.special_person_name,
      };

      const addToCartApiResponse = await addToCartApi(requestData);
      setCartListApi((prevList) =>
        prevList.map((item) => (item.id === addToCartApiResponse?.data.id ? addToCartApiResponse.data : item))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsPreloaderShow(false);
    }
  };

  const handleRemoveCartItem = async (cartId) => {
    try {
      setIsPreloaderShow(true);
      const removeCartApiResponse = await removeCartApi(cartId, {});
      await getUserProfile();
      setCartListApi(removeCartApiResponse?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPreloaderShow(false);
    }
  }

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => {
      const newAddressData = { ...prevData, [name]: value };
      validateAddressField(name, value);
      return newAddressData;
    });
  };

  const validateAddressField = (name, value) => {
    let error = "";

    if (!value) {
      error = "This field is required";
    }
    setAddressErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const [selectedDeliveryAddressID, setSelectedDeliveryAddressID] = useState(null);
  const [isAddressEdit, setIsAddressEdit] = useState(false);


  const AddressEditForm = ({ 
    addressData, 
    handleAddressInputChange, 
    addressErrors,
    isAddressEdit, 
    handleAddAddress, 
    setIsAddressEdit 
  }) => {  
 

    return (
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typography variant="caption">Title</Typography>
          <TextField
            fullWidth
            placeholder="e.g., Home"
            size="small"
            name="title"
            value={addressData?.title || ""}
            onChange={handleAddressInputChange}
            error={Boolean(addressErrors?.title)}
            helperText={addressErrors?.title}
            required
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="caption">Address</Typography>
          <TextField
            fullWidth
            size="small"
            name="address"
            multiline
            rows={4}
            value={addressData?.address}
            onChange={handleAddressInputChange}
            error={Boolean(addressErrors?.address)}
            helperText={addressErrors?.address}
            required
          />
        </Grid>
        <Grid item md={6}>
          <div>
            <Typography variant="caption">City</Typography>
            <TextField
              fullWidth
              size="small"
              name="city"
              value={addressData?.city}
              onChange={handleAddressInputChange}
              error={Boolean(addressErrors?.city)}
              helperText={addressErrors?.city}
              required
            />
          </div>
          <div className="mt-2">
            <Typography variant="caption">Pincode</Typography>
            <TextField
              fullWidth
              size="small"
              name="pincode"
              value={addressData?.pincode}
              onChange={handleAddressInputChange}
              error={Boolean(addressErrors?.pincode)}
              helperText={addressErrors?.pincode}
              required
            />
          </div>
        </Grid>
        <Grid item md={12} className="text-end">
          <Button
            variant="contained"
            size="small"
            color="error"
            className="me-2"
            onClick={() => {
              // setShowAddressForm(false)
              setIsAddressEdit(false);
            }}
          >
            Close
          </Button>

          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={handleAddAddress}
          >
            {isAddressEdit ? "Save and Deliver Here" : "Add"}
          </Button>
        </Grid>
      </Grid>
    );
  }

  AddressEditForm.propTypes = {
    addressData: PropTypes.shape({
      title: PropTypes.string,
      address: PropTypes.string,
      city: PropTypes.string,
      pincode: PropTypes.string,
    }).isRequired,
    setAddressData: PropTypes.func.isRequired,
    addressErrors: PropTypes.object.isRequired,
    setAddressErrors: PropTypes.func.isRequired,
    isAddressEdit: PropTypes.bool.isRequired,
    handleAddAddress: PropTypes.func.isRequired,
    setIsAddressEdit: PropTypes.func.isRequired,
    handleAddressInputChange: PropTypes.func.isRequired,
  };

  return (
    <div className="cart-main-section">
      {cartListApi.length > 0 ? (
        <Grid container spacing={2}>

          <Grid item xs={12} md={7} sm={12}>
            {
              cartListApi.map((cart, index) => (
                <Card
                  key={index}
                  sx={{ display: "flex", alignItems: "center", padding: 2 }}
                  className="cart-item"
                >
                  <Grid container spacing={2}>
                    <Grid item md={5} xs={12} className="cake-info">
                      <div className="left">
                        <img src={cart?.cake?.images[0]?.url} alt={cart?.cake?.name} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            ml: 2,
                          }}
                        >
                          <Typography variant="h6" className="cake-name">
                            {cart?.cake?.name} [{cart?.cake?.price_list?.kg} Kg]
                          </Typography>
                          <Typography variant="body2" className="cake-category">
                            {cart.sub_category?.name}
                          </Typography>
                          <Typography variant="body2" className="cake-greeting-text">
                            {cart?.greeting_text}
                          </Typography>
                        </Box>
                      </div>
                      <Typography variant="h6" className="cake-price">
                        <span className="rs-font">₹</span>{cart?.price * cart?.qty}/Kg
                      </Typography>
                    </Grid>

                    <Grid item md={7} xs={12} className="price-info">
                      <Box
                        sx={{ display: "flex", alignItems: "center" }}
                        className="quantity-section"
                      >
                        <IconButton onClick={() => handleQuantityChange(cart.id, "decrease")}>
                          <FontAwesomeIcon icon={faMinus} />
                        </IconButton>
                        <TextField
                          value={cart?.qty}
                          inputProps={{ readOnly: true }}
                          size="small"
                          className="cake-quantity-input"
                        />
                        <IconButton onClick={() => handleQuantityChange(cart.id, "increase")}>
                          <FontAwesomeIcon icon={faPlus} />
                        </IconButton>
                      </Box>

                      <Typography variant="h6" className="cake-price">
                        <span className="rs-font">₹</span>{cart?.price * cart?.qty}/Kg
                      </Typography>

                      <IconButton onClick={() => {
                        handleRemoveCartItem(cart?.id)
                      }}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Card>
              ))
            }

          </Grid>

          <Grid item xs={12} md={5} sm={12}>
            <Card className="cart-order-info">
              <CardContent>
                <h4 className="info-title">Order Person Details</h4>
                {/* <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <Typography variant="caption">Name</Typography>
                    <TextField
                      fullWidth
                      size={"small"}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="caption">Phone Number</Typography>
                    <TextField
                      fullWidth
                      size={"small"}
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                  </Grid>
                </Grid> */}
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12} className="order-person-details">
                    <p><span>Name</span> {userProfileInfo?.name}</p>
                    <p><span>Phone</span> {userProfileInfo?.phone}</p>
                    <p><span>Email</span> {userProfileInfo?.email}</p>

                  </Grid>
                </Grid>
                <h4 className="info-title my-3">Delivery Details</h4>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <Typography variant="caption">Name</Typography>
                    <TextField
                      size={"small"}
                      fullWidth
                      name="deliveryName"
                      value={formData.deliveryName}
                      onChange={handleInputChange}
                      required
                      error={!!errors.deliveryName}
                      helperText={errors.deliveryName}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Typography variant="caption">Phone Number</Typography>
                    <TextField
                      size={"small"}
                      fullWidth
                      name="deliveryPhone"
                      value={formData.deliveryPhone}
                      onChange={handleInputChange}
                      required
                      error={!!errors.deliveryPhone}
                      helperText={errors.deliveryPhone}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="caption">Delivery Date & Time</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="datetime-local"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      required
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.deliveryDate}
                      helperText={errors.deliveryDate}
                    />
                  </Grid>

                  {/* Conditionally render selected address */}
                  {selectedAddress && (
                    <Grid item sm={12}>
                      <Box mt={2} className="selected-address-info">
                        <h4>Delivery Address:</h4>
                        <div>
                          <p className="title"><b style={{ color: "#ff1e54", fontWeight: "500" }}>{selectedAddress?.title}</b></p>
                          <p style={{ fontSize: "14px" }}>{selectedAddress?.address}</p>
                          <p style={{ fontSize: "14px" }}>{selectedAddress?.city}
                            {selectedAddress?.pincode && (<><b></b> - {selectedAddress?.pincode}</>)}</p>
                        </div>
                      </Box>
                    </Grid>
                  )}

                  <Grid item md={12}>
                    <div className="text-end">
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        className="me-2"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => setShowAddressForm(!showAddressForm)}
                      >
                        <FontAwesomeIcon icon={faPlusCircle} className="me-1" />
                        {selectedAddress ? "Change Address" : "Select Address"}
                      </Button>
                    </div>

                    {/* Modal for Address Form */}
                    <Modal
                      show={showAddressForm}
                      onHide={() => setShowAddressForm(false)}
                      size="lg"
                      // open={showAddressForm}
                      // onClose={() => setShowAddressForm(false)}
                      aria-labelledby="add-new-address-modal"
                      aria-describedby="add-new-address-form"
                      className="address-Modal"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Select Address</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>

                        <Grid item sm={12}>
                          <div className="addressList">
                            {customerAddressObj?.map((address, index) => (
                              <div
                                key={index}
                                className={`addresCard p-2 m-0 ${selectedAddressID === address?.id ? "selected-address" : ""}`}
                                onClick={() => {
                                  setSelectedDeliveryAddressID(address?.id)
                                }}
                              >
                                <Grid container spacing={2}>
                                  <Grid item sm={1}>
                                    <div>
                                      <Checkbox size="small" checked={selectedDeliveryAddressID === address?.id} />
                                    </div>
                                  </Grid>
                                  <Grid item sm={11}>
                                    <div>
                                      <p className="title"><b style={{ color: "#ff1e54" }}>{address?.title}</b></p>
                                      <p style={{ fontSize: "14px" }}>{address?.address}</p>
                                      <p style={{ fontSize: "14px" }}><b>City:</b> {address?.city}
                                        {address?.pincode && (<><b></b> - {address?.pincode}</>)}</p>

                                      {(selectedDeliveryAddressID === address?.id && !isAddressEdit) && (
                                        <div className="my-2 d-flex justify-content-between">
                                          <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            className="me-2"
                                            style={{ textTransform: "capitalize" }}
                                            onClick={() => handleSelectAddress(address)}
                                          >
                                            Deliver here
                                          </Button>

                                          <Button
                                            variant="contained"
                                            size="small"
                                            color="success"
                                            style={{ textTransform: "capitalize" }}
                                            onClick={() => handleEditAddress(address)}
                                          >
                                            Edit Address
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </Grid>
                                </Grid>

                                {((selectedDeliveryAddressID === address?.id) && isAddressEdit) && (
                                  <AddressEditForm
                                    addressData={addressData}
                                    setAddressData={setAddressData}
                                    addressErrors={addressErrors}
                                    setAddressErrors={setAddressErrors}
                                    isAddressEdit={isAddressEdit}
                                    handleAddAddress={handleAddAddress}
                                    setIsAddressEdit={setIsAddressEdit}
                                    handleAddressInputChange={handleAddressInputChange}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </Grid>

                      </Modal.Body>
                    </Modal>
                  </Grid>

                </Grid>
                <Box mt={2} className="total-info">
                  <div className="sub-total">
                    <h4>Cart Subtotal</h4> <span>₹{totalPrice}</span>
                  </div>
                  <Divider className="divider-line" />
                  <div className="sub-total">
                    <h4>Delivery</h4> <span>{deliveryCharge ? "₹" + deliveryCharge : "free"}</span>
                  </div>
                  <Divider className="divider-line" />
                  <div className="grand-total">
                    <h4>Grand Total</h4> <span><span className="rs-font">₹</span>{totalPrice + deliveryCharge}</span>
                  </div>
                </Box>
                <Box className="complete-order-section">
                  <IconButton>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </IconButton>
                  <Button
                    className="complete-order-button"
                    onClick={() => {
                      handleSubmitOrder()
                    }}
                  >
                    Complete Order <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>


        </Grid>)
        : (
          <Card
            sx={{ display: "flex", alignItems: "center", padding: 2 }}
            className="cart-item card-no-items"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>
                  No cart items available
                </Typography>
              </Grid>
            </Grid>
          </Card>
        )}
    </div>
  );
};




export default Cart;
