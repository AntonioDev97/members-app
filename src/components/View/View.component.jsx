import React from 'react';
import PropTypes from 'prop-types';

const View = ({ id }) => {
    return(
        <>View Member Component, {id}</>
    );
};

View.propTypes = {
    id: PropTypes.string.isRequired
}

export default View;