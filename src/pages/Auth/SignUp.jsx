import React, { useContext } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import chefImage from "../../assets/chef.png";
import './auth.scss';
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../../utils/AuthAPI";
import { DataContext } from "../../context/DataContext";
import { showToast } from "../../component/common/ToastAlert";

const SignUp = () => {

  const navigate = useNavigate();
  const { setIsPreloaderShow } = useContext(DataContext)

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Name is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/^\S*$/, "Password cannot contain spaces")
        .required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      handleSignup(values)
    },

  });

  const handleSignup = async (values) => {
    try {
      setIsPreloaderShow(true);
      const signUpApiResponse = await signupApi(values);
      showToast('Sign-Up successfully!');
      navigate('/login');
    } catch (error) {
      showToast('Something Went Wrong!', 'error');
      console.error("log", error);
    } finally {
      setIsPreloaderShow(false);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="login-container" >
      <Container
        className="sign-up-section inner-container"
      >
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item md={5} sm={12} xs={12} order={isMobile ? 2 : 1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box className="left-box">
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }} className="title">
                Create Account
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', fontSize: "13px" }} className="desc">
                You have to register first to get all our services
              </Typography>
              <form onSubmit={validation.handleSubmit}>
                <Typography variant="caption">Name</Typography>
                <TextField
                  fullWidth
                  size={"small"}
                  margin="normal"
                  name="name"
                  value={validation.values.name}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  error={validation.touched.name && Boolean(validation.errors.name)}
                  helperText={validation.touched.name && validation.errors.name}
                  sx={{ mt: 0.5 }}
                />

                <Typography variant="caption">Mobile Number</Typography>
                <TextField
                  fullWidth
                  size={"small"}
                  margin="normal"
                  name="phone"
                  type="phone"
                  value={validation.values.phone}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  error={validation.touched.phone && Boolean(validation.errors.phone)}
                  helperText={validation.touched.phone && validation.errors.phone}
                  sx={{ mt: 0.5 }}
                />

                <Typography variant="caption">Email</Typography>
                <TextField
                  fullWidth
                  size={"small"}
                  margin="normal"
                  name="email"
                  type="email"
                  value={validation.values.email}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  error={validation.touched.email && Boolean(validation.errors.email)}
                  helperText={validation.touched.email && validation.errors.email}
                  sx={{ mt: 0.5 }}
                />


                <Typography variant="caption">Password</Typography>
                <TextField
                  fullWidth
                  size={"small"}
                  margin="normal"
                  name="password"
                  type="password"
                  value={validation.values.password}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  error={validation.touched.password && Boolean(validation.errors.password)}
                  helperText={validation.touched.password && validation.errors.password}
                  sx={{ mt: 0.5 }}
                />

                <Typography variant="caption">Confirm Password</Typography>
                <TextField
                  fullWidth
                  size={"small"}
                  margin="normal"
                  name="confirm_password"
                  type="password"
                  value={validation.values.confirm_password}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  error={validation.touched.confirm_password && Boolean(validation.errors.confirm_password)}
                  helperText={validation.touched.confirm_password && validation.errors.confirm_password}
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
                <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '10px' }}>
                  Don&apos;t have an account already?
                  <Button
                    sx={{ marginLeft: '5px', textTransform: 'none', padding: 0 }}
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                </Typography>
              </form>
            </Box>
          </Grid>
          <Grid item md={7} sm={12} xs={12} order={isMobile ? 1 : 2} className="right-side-image" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              className="chefImage"
              sx={{
                backgroundColor: '#006770',
                padding: '20px',
                borderRadius: '50px',
              }}
            >
              <img
                src={chefImage}
                title="Chef Image"
                alt="Chef"
                style={{ width: '100%', borderRadius: '50px' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SignUp;
