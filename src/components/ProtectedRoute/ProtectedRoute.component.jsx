import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMemberContext } from '../../Member.context';

const ProtectedRoute = ({ children }) => {
    const { state } = useMemberContext();
    const isAuth = state.token;
    return isAuth ? children : <Navigate to='/login' replace />
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;