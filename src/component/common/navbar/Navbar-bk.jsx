import { Navbar } from "react-bootstrap";
import "./Navbar.scss";
import cart from "../../../assets/icons/bag-happy.svg";
import location from "../../../assets/icons/Location.svg";
import user from "../../../assets/icons/user.svg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useContext, useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import ProfileCard from "../../../pages/Profile/ProfileCard";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutApi } from "../../../utils/AuthAPI";
import Cookies from "universal-cookie";
import { DataContext } from "../../../context/DataContext";
import { Refresh } from "@mui/icons-material";
import AuthModal from "../../../pages/Auth/AuthModal";

const TopNavbar = () => {
  const cookies = new Cookies();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();
  const { accessToken, setAccessToken, setIsPreloaderShow } = useContext(DataContext)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(anchorElUser ? null : event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    const Token = JSON.parse(localStorage.getItem('web_magilshe_token'))

    let requestData = {
      "refresh_token": Token?.refresh
    }
    try {
      setIsPreloaderShow(true);
      const logoutApiResponse = await logoutApi(requestData);
      localStorage.removeItem('web_magilshe_token')
      cookies.remove('web_access_token')
      setAccessToken("");
      navigate('/')
    } catch (error) {
      console.error(error)
    } finally {
      setIsPreloaderShow(false)

    }
  };


  const [profileOpen, setProfileOpen] = useState(false);
  const userProfile = {
    name: 'Vinish Kevin',
    email: 'vinisk.vk45@gmail.com',
    phoneNumber: '9894431585',
    pincode: '619901',
    profilePicture: 'https://via.placeholder.com/80', // Replace with the actual image URL
  };

  const handleClose = () => {
    setProfileOpen(false);
  };



  const [isLoginShow, setIsLoginShow] = useState(false)

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar_container">
      <Container fluid className="wrapper">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Brand href="/" className="logo theme-logo">
          MagilShe.<span className="special">Cakery</span>
        </Navbar.Brand>

        <Nav className="right-nav links right-side-nav-mobile">
          <Nav.Link as={NavLink} to="/cart">
            <img src={cart} alt="" />
          </Nav.Link>
          <Nav.Link as={NavLink} to="#" onClick={handleOpenUserMenu}>
            <img src={user} alt="" />
          </Nav.Link>
        </Nav>

        <Navbar.Collapse id="responsive-navbar-nav" onSelect={handleCollapse}>
          <Nav className="m-auto links">
            <Nav.Link as={NavLink} to="/home" >
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/menu">Menu</Nav.Link>
            <Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
            <Nav.Link as={NavLink} to="/offers">Offers</Nav.Link>
            <Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
          </Nav>

          <Nav className="right-nav links right-side-nav-desktop">
            <Nav.Link href="#">
              <img src={location} alt="" />
              Deliver
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart">
              <img src={cart} alt="" /> Cart
            </Nav.Link>
            <Nav.Link href="#" onClick={handleOpenUserMenu} >
              <img src={user} alt="" />
              <span>My Account </span>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => {
                  handleCloseUserMenu();
                  setProfileOpen(true);
                }} className="profile-menu-item">

                  <Typography textAlign="center" className="d-flex align-items-center">
                    <img src={require(`../../../assets/icons/my-profile-icon.png`)} className="w-[20px] h-[20px] me-2" />{"My Profile"}</Typography>
                </MenuItem>

                {accessToken ? (
                  <MenuItem className="profile-menu-item">
                    <Link onClick={() => {
                      handleLogout()
                    }} className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img src={require(`../../../assets/icons/logout-icon.png`)} className="w-[20px] h-[20px] me-2" />
                      <Typography >
                        {"Logout"}</Typography>
                    </Link>
                  </MenuItem>) : (

                  <MenuItem className="profile-menu-item">
                    <Link                       
                      className="d-flex align-items-center" 
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      // to={"/login"} 
                      onClick={()=>{
                        setIsLoginShow(true);
                      }}
                    >
                      <img 
                        src={require(`../../../assets/icons/logout-icon.png`)} 
                        className="w-[20px] h-[20px] me-2" 
                      />
                      <Typography>{"Log In"}</Typography>
                    </Link>
                  </MenuItem>)}

              </Menu>
              <ProfileCard open={profileOpen} onClose={handleClose} user={userProfile} />

            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
      {/* <LoginModal show={isLoginShow} setShow={setIsLoginShow} /> */}
      <AuthModal show={isLoginShow} setShow={setIsLoginShow} />
    </Navbar>
  );
};

export default TopNavbar;
