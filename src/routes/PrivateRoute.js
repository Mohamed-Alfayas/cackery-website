// import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const PrivateRoute = ({ children }) => {
    let web_access_token;
    const cookies = new Cookies();

    try {
        web_access_token = cookies.get("web_access_token");
    } catch (e) {
        web_access_token = null;
    }

    const isValidUser = web_access_token;

    return (
        isValidUser ? children : <Navigate to="/login" />
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired,
};

export default PrivateRoute;
