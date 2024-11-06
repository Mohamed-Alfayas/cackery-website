import React, { useContext, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import PropTypes from "prop-types";
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
import chefImage2 from "../../assets/chef-2.png";
import './auth.scss';
import { DataContext } from "../../context/DataContext";
import { loginApi } from "../../utils/AuthAPI";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { showToast } from "../../component/common/ToastAlert";
import './LoginModal.scss';

function LoginContainer({ setIsSignupPage, setShow }) {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const { setAccessToken, setIsPreloaderShow } = useContext(DataContext);

    const [loginCredentials, setLoginCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginCredentials((oldData) => ({
            ...oldData,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            setIsPreloaderShow(true);
            const loginApiResponse = await loginApi(loginCredentials);
            const { tokens } = loginApiResponse?.data || {};

            localStorage.setItem('web_magilshe_token', JSON.stringify(tokens));
            cookies.set('web_access_token', tokens?.access);
            setAccessToken(tokens?.access);
            showToast('Sign-in successfully!', "success");
            setShow(false)
        } catch (error) {
            console.error("Login error:", error?.message);
            showToast(error?.message || 'Something Went Wrong!', 'error');
        } finally {
            setIsPreloaderShow(false);
        }
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className="login-Modal-container">
            <Container className="sign-up-section inner-container">
                <Grid container spacing={0.5} direction={'row'}>
                    <Grid item md={6} sm={12} xs={12} order={isMobile ? 2 : 1} className="d-flex align-items-center">
                        <Box className="left-box">
                            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }} className="title">
                                Welcome Back
                            </Typography>
                            <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', fontSize: "13px" }} className="desc">
                                Welcome Back, Please enter your details
                            </Typography>

                            <Grid item md={10} className="mx-auto">
                                <Typography variant="caption" className="auth-input-label">User Name/Phone Number</Typography>
                                <TextField
                                    fullWidth
                                    type="text"
                                    size="small"
                                    margin="normal"
                                    name="username"
                                    value={loginCredentials.username}
                                    onChange={handleChange}
                                    required
                                    sx={{ mt: 0.5 }}
                                />
                                <Typography variant="caption" className="auth-input-label">Password</Typography>
                                <TextField
                                    fullWidth
                                    type="password"
                                    size="small"
                                    margin="normal"
                                    name="password"
                                    value={loginCredentials.password}
                                    onChange={handleChange}
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
                                    onClick={handleLogin}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '10px' }}>
                                {"Don't have an account?"}
                                <Button
                                    sx={{ marginLeft: '5px', textTransform: 'none', padding: 0 }}
                                    onClick={() => {
                                        setIsSignupPage(true)
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12} order={isMobile ? 1 : 2} className="right-side-image">
                        <Box className="chefImage" sx={{ backgroundColor: '#EE6C4D' }}>
                            <img src={chefImage2} alt="Login-Chef" />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

LoginContainer.propTypes = {
    setIsSignupPage: PropTypes.func.isRequired,
    setShow: PropTypes.func.isRequired,
};

export default LoginContainer;