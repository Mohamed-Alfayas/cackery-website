import React from 'react'
// import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

const PublicRoute = ({ children }) => {
  return (
    <React.Fragment>{children}</React.Fragment>
  )
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute