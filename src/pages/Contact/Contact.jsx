import React, { useContext, useState } from "react";
import { Box, Grid, TextField, Button, Typography, Paper } from "@mui/material";
import "./Contact.scss";
import { contactApi } from "../../utils/cakeryAPI";
import { showToast } from "../../component/common/ToastAlert";
import { DataContext } from "../../context/DataContext";

const ContactForm = () => {

  

  const [contactData, setContactData] = useState({
    name: "",
    mobile: "",
    message: "",
    is_subscribed: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };



  const validate = () => {
    let tempErrors = { name: "", mobile: "", message: "" };
    let isValid = true;

    if (!contactData.name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    const phoneRegex = /^[0-9\b]+$/;
    if (!contactData.mobile) {
      tempErrors.mobile = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(contactData.mobile)) {
      tempErrors.mobile = "Phone number is invalid";
      isValid = false;
    }

    if (!contactData.message) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      contactApi(contactData)
        .then((response) => {
          console.log("API Response:", response);
          showToast("Message sent successfully!", "success");

          setContactData({
            name: "",
            mobile: "",
            message: "",
            is_subscribed: false,
          });
        })
        .catch((error) => {
          console.error("API Error:", error);
          showToast("Failed to send message. Please try again.", "error");
        });
    } else {
      showToast("Please fill out the required fields correctly.", "error");
    }
  };

  return (
    <Paper className="contact-form" elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" className="title" gutterBottom>
        Send Us a Message
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              required
              name="name"
              value={contactData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              required
              type="tel"
              // inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
              name="mobile"
              value={contactData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              required
              name="message"
              value={contactData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              className="mt-3"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

const ContactInformation = () => {

  const { configurationData } = useContext(DataContext)

  return (
    <Paper className="contact-information" elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography className="title" variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Typography variant="body1" className="address">
        <h4>Address</h4>
        <p>{configurationData?.company_address}</p>
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }} className="address">
        <h4>Phone Number</h4>
        <p>{configurationData?.mobile}</p>
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }} className="address">
        <h4>Email</h4>
        <p>{configurationData?.email}</p>
      </Typography>
    </Paper>
  );
};

const Contact = () => {

  const { configurationData } = useContext(DataContext)
  
  return (
    <Box sx={{ flexGrow: 1, p: 2 }} className="contact-page">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6} md={6}>
          <ContactForm />
          <ContactInformation />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <Box
            className="map-div"
            component="iframe"
            src={configurationData?.map_iframe_link}
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            sx={{ border: 0 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
