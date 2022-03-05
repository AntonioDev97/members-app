import { Breadcrumb as BreadcrumbCarbon, BreadcrumbItem } from 'carbon-components-react';
import React from 'react';
import PropTypes from 'prop-types';

const Breadcrumb = ({ path, id }) => {
    return (
        <BreadcrumbCarbon>
            <BreadcrumbItem href='/dashboard'>Dashboard</BreadcrumbItem>
            { path && 
                <BreadcrumbItem 
                style={{ textTransform: 'capitalize' }} 
                href={path === 'view' ? '#' : `/dashboard/${path}`}>
                    { path }
                </BreadcrumbItem> 
            }
            { id && <BreadcrumbItem href={`/dashboard/${path}/${id}`}>{ id }</BreadcrumbItem> }
        </BreadcrumbCarbon>
    );
};

Breadcrumb.propTypes = {
    path: PropTypes.string,
    id: PropTypes.string
}

export default Breadcrumb;