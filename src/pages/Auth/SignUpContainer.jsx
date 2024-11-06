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
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import chefImage from "../../assets/chef.png";
import './auth.scss';
import { signupApi } from "../../utils/AuthAPI";
import { DataContext } from "../../context/DataContext";
import { showToast } from "../../component/common/ToastAlert";

const SignUpContainer = ({ setIsSignupPage, setShow }) => {
    const navigate = useNavigate();
    const { setIsPreloaderShow } = useContext(DataContext);

    const validation = useFormik({
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
            handleSignup(values);
        },
    });

    const handleSignup = async (values) => {
        try {
            setIsPreloaderShow(true);
            await signupApi(values);
            showToast('Sign-Up successfully!');
            setIsSignupPage(false);
        } catch (error) {
            showToast('Something Went Wrong!', 'error');
            console.error("SignUp Error:", error);
        } finally {
            setIsPreloaderShow(false);
        }
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container className="sign-up-section inner-container">
            <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item md={6} sm={12} xs={12} order={isMobile ? 2 : 1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box className="left-box">
                        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }} className="title">
                            Create Account
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', fontSize: "13px" }} className="desc">
                            You have to register first to get all our services
                        </Typography>
                        <Grid item md={10} className="mx-auto">

                            <form onSubmit={validation.handleSubmit}>
                                <Grid container spacing={0.5}>
                                    {[
                                        { label: "Name", name: "name", type: "text", column: 12 },
                                        { label: "Mobile Number", name: "phone", type: "phone", column: 12 },
                                        { label: "Email", name: "email", type: "email", column: 12 },
                                        { label: "Password", name: "password", type: "password", column: 6 },
                                        { label: "Confirm Password", name: "confirm_password", type: "password", column: 6 },
                                    ].map(({ label, name, type, column }) => (
                                        <Grid item md={column} sm={column} key={name}>
                                            <React.Fragment >
                                                <Typography variant="caption">{label}</Typography>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    margin="normal"
                                                    name={name}
                                                    type={type}
                                                    value={validation.values[name]}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    error={validation.touched[name] && Boolean(validation.errors[name])}
                                                    // helperText={validation.touched[name] && validation.errors[name]}
                                                    sx={{ mt: 0.1 }}
                                                />
                                            </React.Fragment>
                                        </Grid>
                                    ))}
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
                                        Already have an account?
                                        <Button
                                            sx={{ marginLeft: '5px', textTransform: 'none', padding: 0 }}
                                            onClick={() => {
                                                setIsSignupPage(false)
                                            }}
                                        >
                                            Login
                                        </Button>
                                    </Typography>
                                </Grid>
                            </form>

                        </Grid>
                    </Box>
                </Grid>
                <Grid item md={6} sm={12} xs={12} order={isMobile ? 1 : 2} className="right-side-image" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                            alt="Chef"
                            title="Chef Image"
                            style={{ width: '100%', borderRadius: '50px' }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

SignUpContainer.propTypes = {
    setIsSignupPage: PropTypes.func.isRequired, // Expecting a function, not a boolean
    setShow: PropTypes.func.isRequired,
};

export default SignUpContainer;