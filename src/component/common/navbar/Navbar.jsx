import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navbar.scss";
import cart from "../../../assets/icons/bag-happy.svg";
import location from "../../../assets/icons/Location.svg";
import user from "../../../assets/icons/user.svg";

import { useContext, useState } from "react";
import { Badge, Menu, MenuItem, Typography } from "@mui/material";
import ProfileCard from "../../../pages/Profile/ProfileCard";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutApi } from "../../../utils/AuthAPI";
import Cookies from "universal-cookie";
import { DataContext } from "../../../context/DataContext";
import AuthModal from "../../../pages/Auth/AuthModal";

const TopNavbar = () => {
  const cookies = new Cookies();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();
  const { accessToken, setAccessToken, setIsPreloaderShow, userProfileInfo } = useContext(DataContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(anchorElUser ? null : event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    const Token = JSON.parse(localStorage.getItem('web_magilshe_token'));

    let requestData = {
      "refresh_token": Token?.refresh
    };
    try {
      setIsPreloaderShow(true);
      await logoutApi(requestData);
      localStorage.removeItem('web_magilshe_token');
      cookies.remove('web_access_token');
      setAccessToken("");
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsPreloaderShow(false);
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

  const [isLoginShow, setIsLoginShow] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" expanded={expanded} className="navbar_container">
      <Container fluid className="wrapper">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />

        <Navbar.Brand as={NavLink} to="/home" className="logo theme-logo">
          MagilShe.<span className="special">Cakery</span>
        </Navbar.Brand>

        <Nav className="right-nav links right-side-nav-mobile">
          <Nav.Link as={NavLink} to="/cart" onClick={() => setExpanded(false)}>
            <img src={cart} alt="Cart" />
          </Nav.Link>
          <Nav.Link as={NavLink} to="#" onClick={handleOpenUserMenu}>
            <img src={user} alt="User" />
          </Nav.Link>
        </Nav>

        <Navbar.Collapse id="responsive-navbar-nav" onClick={() => setExpanded(false)}>
          <Nav className="m-auto links">
            <Nav.Link as={NavLink} to="/home" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/menu" onClick={() => setExpanded(false)}>Menu</Nav.Link>
            <Nav.Link as={NavLink} to="/gallery" onClick={() => setExpanded(false)}>Gallery</Nav.Link>
            <Nav.Link as={NavLink} to="/offers" onClick={() => setExpanded(false)}>Offers</Nav.Link>
            {/* <Nav.Link as={NavLink} to="/orders" onClick={() => setExpanded(false)}>Orders</Nav.Link> */}
            <Nav.Link as={NavLink} to="/contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
          </Nav>

          <Nav className="right-nav links right-side-nav-desktop">
            <Nav.Link href="#">
              <img src={location} alt="Location" />
              Deliver
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/cart" onClick={() => setExpanded(false)}>
              <img src={cart} alt="Cart" /> Cart
            </Nav.Link> */}
            <Nav.Link onClick={() => {
              if(accessToken){
                navigate("/cart")
              }else{
                setIsLoginShow(true)
              }
            }}>
              <Badge badgeContent={userProfileInfo?.active_cart_count || null} color="error" className="cart-badge" sx={{right: "4px"}}>
                <img src={cart} alt="Cart" />
              </Badge>
               Cart
            </Nav.Link>
            
            {!accessToken ? (
              <Nav.Link 
                as={NavLink} to="/login" 
                //onClick={() => setIsLoginShow(true)}
              >
                <img src={user} alt="Cart" /> Sign In
              </Nav.Link>
            ) : (
              <Nav.Link href="#" onClick={handleOpenUserMenu}>
                <img src={user} alt="User" />
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
                  <MenuItem 
                    onClick={() => {
                      // handleCloseUserMenu();
                      // setProfileOpen(true);
                      navigate('/profile');
                    }} 
                    
                    className="profile-menu-item"
                  >
                    <Typography textAlign="center" className="d-flex align-items-center">
                      <img src={require(`../../../assets/icons/my-profile-icon.png`)} className="w-[20px] h-[20px] me-2" alt="Profile Icon" />My Profile
                    </Typography>
                  </MenuItem>

                  <MenuItem className="profile-menu-item">
                    <Link as={NavLink} to="/orders" className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img src={cart} className="w-[20px] h-[20px] me-2" alt="Logout Icon" />
                      <Typography>Orders</Typography>
                    </Link>
                  </MenuItem>

                  <MenuItem className="profile-menu-item">
                    <Link onClick={handleLogout} className="d-flex align-items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img src={require(`../../../assets/icons/logout-icon.png`)} className="w-[20px] h-[20px] me-2" alt="Logout Icon" />
                      <Typography>Logout</Typography>
                    </Link>
                  </MenuItem>

                </Menu>
                <ProfileCard open={profileOpen} onClose={handleClose} user={userProfile} />
              </Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
      <AuthModal show={isLoginShow} setShow={setIsLoginShow} />
    </Navbar>
  );
};

export default TopNavbar;
