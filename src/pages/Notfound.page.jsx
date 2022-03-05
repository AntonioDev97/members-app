import { Link } from 'carbon-components-react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const NotfoundPage = () => {
    return (
        <div id='container-notfound'>
            <h3>
                404 | The page does not exist
            </h3>
            <Link component={RouterLink} href='/'>
                Return to Home
            </Link>
        </div>  
    );
};

export default NotfoundPage;