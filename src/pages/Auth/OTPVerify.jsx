import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Grid
} from "@mui/material";
import chefImage3 from "../../assets/chef-3.png";
import OTPInput from "react-otp-input";
import './auth.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const OTPVerify = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entered OTP:", otp);
    // Add OTP verification logic here
  };

  return (
    <div style={{
      height: "95vh",
      display: "flex",
      alignItems: 'center'
    }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          background: '#F9F9F9',
          borderRadius: '50px'
        }}
        className="sign-up-section"
      >
        <Grid container spacing={2}>
          <Grid item md={5} className="d-flex align-items-center">
            <Box
              sx={{
                padding: '30px',
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }} className="title">
                Welcome Back
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', fontSize: "13px" }} className="desc">
                Welcome Back, Please enter your details
              </Typography>
              <form onSubmit={handleSubmit} className="mt-5">
                <Typography variant="caption"><FontAwesomeIcon icon={faEdit} /> {"+91 8072770251"}</Typography><br />
                <Typography variant="caption">OTP</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <OTPInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={4}
                    separator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      width: '50px',
                      height: '50px',
                      margin: '0 0.5rem',
                      fontSize: '1rem',
                      borderRadius: '6px',
                      border: '1.5px solid #E1E1E1',
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    marginTop: '20px',
                    background: 'linear-gradient(90deg, #FF1E54 0%, #FF5B83 100%)',
                    borderRadius: '8px',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#d81b60',
                    },
                  }}
                  fullWidth
                >
                  Verify OTP
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid item md={7} className="right-side-image">
            <Box
              className="chefImage"
              sx={{
                backgroundColor: '#06745B',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '0 50px 50px 0'
              }}
            >
              <img
                src={chefImage3}
                alt="Chef"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '0 50px 50px 0'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default OTPVerify;
