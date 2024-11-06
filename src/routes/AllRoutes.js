import { Navigate } from "react-router";
import Home from "../pages/HomePage/Home";
import Contact from "../pages/Contact/Contact";
import Gallery from "../pages/Gallery/Gallery";
import Cart from "../pages/Cart/Cart";
import MenuList from "../pages/Menu/MenuList";
import Offer from "../pages/Offer/Offer";
import MyOrders from "../pages/Cart/Orders";
import Profile from "../pages/Profile/ProfileCard";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import MenuItemPreview from "../pages/Menu/MenuItemPreview/MenuItemPreview";
import MyProfile from "../pages/Profile/MyProfile";
import AddOnGift from "../pages/GiftPage/AddOnGift";
import PrivacyAndPolicy from "../pages/Policies/PrivacyAndPolicy";
import TermsAndConditions from "../pages/Policies/TermsAndConditions";

const publicRoutes = [
    { path: "/home", component: <Home /> },
    { path: "/gallery", component: <Gallery /> },
    { path: "/contact", component: <Contact /> },
    { path: "/privacy-policy", component: <PrivacyAndPolicy /> },
    { path: "/terms-conditions", component: <TermsAndConditions /> },
    { path: "/menu", component: <MenuList /> },
    { path: "/offers", component: <Offer /> },
    { path: "/menu/:id", component: <MenuItemPreview /> },
    {
        path: "/",
        exact: true,
        component: <Navigate to="/home" />,
    },
]

const privateRoutes = [  
    { path: "/cart", component: <Cart /> },
    { path: "/orders", component: <MyOrders /> },
    { path: "/add-on", component: <AddOnGift /> },
    { path: "/profile", component: <MyProfile /> },
]

const loginRoutes = [    
    { path: '/login', component: <Login /> },
    { path: '/sign-up', component: <SignUp /> },  
]

export { publicRoutes, privateRoutes, loginRoutes };