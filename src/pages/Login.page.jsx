import React from 'react';
import Login from '../components/Login';
import PropTypes from 'prop-types';

const LoginPage = ({ setSession }) => {
    return (
        <Login setSession={setSession} />
    );
};

LoginPage.propTypes = {
    setSession: PropTypes.func.isRequired,
};


export default LoginPage;