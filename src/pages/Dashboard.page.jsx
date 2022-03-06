import React from 'react';
import { 
    Button,
    Column,
    Grid,
    Row,
} from 'carbon-components-react';
import Add from '../components/Add';
import Breadcrumb from '../components/Breadcrumb';
import { Logout32 } from '@carbon/icons-react';
import TableList from '../components/TableList';
import useSession from '../hooks/useSession';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useMemberContext } from '../Member.context';
import View from '../components/View';

const DashboardPage = () => {
    const { dispatch } = useMemberContext();
    const { destroySession } = useSession(dispatch);
    const navigate = useNavigate();
    const location = (useLocation().pathname).split('/')[2];
    const { id } = useParams();

    const handleLogout = (e) => {
        e.preventDefault();
        destroySession();
        navigate('/');
    };

    const renderComponent = () => {
        const components = {
            add: () => <Add/>,
            view: () => <View id={id} />
        }
        return components[location] ? components[location]() : <TableList/>;
    };

    return (
        <Grid fullWidth id='container-dashboard'>
            <Row className='container-navbar'>
                <Column sm={4} md={6} lg={10}>
                    <h2>POC Members System</h2>
                </Column>
                <Column sm={4} md={2} lg={2}>
                    <Button 
                    onClick={handleLogout}
                    renderIcon={Logout32}>
                        Log Out
                    </Button>
                </Column>
            </Row>
            <Row className='dashboard-body'>
                <Grid fullWidth className='component-container'>
                    <Row className='container-breadcrumb'>
                        <Column>
                            <Breadcrumb path={location} id={id} />
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            { renderComponent() } 
                        </Column>
                    </Row>
                </Grid>
            </Row>
        </Grid>
    );  
};

export default DashboardPage;