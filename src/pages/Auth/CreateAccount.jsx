import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Card,
  CardMedia,
  Grid
} from "@mui/material";
import chefImage from "../../assets/chef.png";
import './auth.css';


const CreateAccount = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: "",
    pincode: "",
  });

  const handleChange = (value, name) => {
    setDetails((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Account Created");
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
          <Grid item md={5}>
            <Box
              sx={{
                padding: '30px',
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }} className="title">
                Create Account
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', fontSize: "13px" }} className="desc">
                You have to register first to get all our services
              </Typography>
              <form onSubmit={handleSubmit}>
                <Typography variant="caption">Name</Typography>
                <TextField
                  fullWidth
                  size={"small"}
                  margin="normal"
                  value={details?.name || ""}
                  onChange={(e) => handleChange(e.target.value, "name")}
                  required
                  sx={{ mt: 0.5 }}
                />
                <Typography variant="caption">Email</Typography>

                <TextField
                  fullWidth
                  size={"small"}
                  margin="normal"
                  value={details?.name || ""}
                  onChange={(e) => handleChange(e.target.value, "email")}
                  required
                  sx={{ mt: 0.5 }}
                />
                <Typography variant="caption">Address</Typography>

                <TextField
                  fullWidth
                  size={"small"}
                  margin="normal"
                  value={details?.name || ""}
                  onChange={(e) => handleChange(e.target.value, "address")}
                  required
                  multiline
                  rows={3}
                  sx={{ mt: 0.5 }}
                />
                <Typography variant="caption">PinCode</Typography>

                <TextField
                  fullWidth
                  size={"small"}
                  margin="normal"
                  value={details?.name || ""}
                  onChange={(e) => handleChange(e.target.value, "pincode")}
                  required
                  sx={{ mt: 0.5 }}
                />
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
                  Create Account
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid item md={7} className="right-side-image">
            <Box
              className="chefImage"
              sx={{
                backgroundColor: '#006770',
              }}
            >
              <img
                src={chefImage}
                title="Chef Image"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateAccount;
