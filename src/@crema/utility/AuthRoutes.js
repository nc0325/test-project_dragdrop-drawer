import React from 'react';
import PropTypes from 'prop-types';

const AuthRoutes = ({children}) => {
  return <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
