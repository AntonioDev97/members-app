import React from 'react';
import { 
    Button, 
    Row, 
    Column,
    Grid,
    Form,
    TextInput,
    Checkbox,
    InlineNotification
} from 'carbon-components-react';
import { User32 } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import { useLogin } from '../../hooks/useLogin';
import './Login.style.scss';

const Login = ({ setSession }) => {
    const { handleChange, handleSubmit, loginInput, error } = useLogin(setSession);
    
    return (
        <Grid fullWidth className='container'>
            <Row className='login-row'>
                <Column>
                    <Form onSubmit={handleSubmit} >
                        <Grid fullWidth>
                            <Row>
                                <Column>
                                    <h3>POC Members Login</h3>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <TextInput
                                    id='email'
                                    name='email'
                                    type='email'
                                    labelText='Email:' 
                                    placeholder='member@email.com'
                                    value={loginInput.email}
                                    onChange={handleChange}
                                    invalid={loginInput.invalidEmail}
                                    invalidText='Invalid Email'
                                    required />
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <TextInput 
                                    id='passw'
                                    name='passw'
                                    type='password'
                                    labelText='Password:'
                                    placeholder='Password123'
                                    value={loginInput.passw} 
                                    onChange={handleChange}
                                    invalid={loginInput.invalidPassw}
                                    invalidText='Invalid Password'
                                    required />
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <Checkbox id='remember' labelText='Remember me' /> 
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <Button
                                    type='submit'
                                    renderIcon={User32}>
                                        Sign In
                                    </Button> 
                                </Column>
                            </Row>
                            { error && <Row>
                                <Column>
                                    <InlineNotification 
                                    kind='error'
                                    title={error} />
                                </Column>
                            </Row> }
                        </Grid>
                    </Form>
                </Column>
            </Row>
        </Grid>
    );
};

Login.propTypes = {
    setSession: PropTypes.func.isRequired,
};

export default Login;