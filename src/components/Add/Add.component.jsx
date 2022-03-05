import React, { useState } from 'react';
import Form from '../Form/Form.component';
import { Modal } from 'carbon-components-react';
import { useMemberContext } from '../../Member.context';
import { AxiosAction } from '../../utils/axios-action';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const { dispatch, state } = useMemberContext();
    const [ modal, setModal ] = useState({ active: false, message: 'Unknow message', redirect: false });
    const { member, token } = state;
    const navigate = useNavigate();

    const handleFormSubmit = async (data) => {
        const body = { ...data };
        delete body.id;
        body.classCompletionDate = new Date(body.classCompletionDate).toISOString().split('T')[0];
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const endpoint = process.env.REACT_APP_ENDPOINT_ADD_MEMBER;
            const response = await AxiosAction.post(endpoint, body, token);
            const { status, message } = response.data;
            dispatch({ type: 'SET_LOADING', payload: false });
            setModal(() => ({ ...modal, active: true, message, redirect: (status === 200) }));
        } catch (error) {
            const errorMsg = error.response && error.response.data ? 
                error.response.data.message : 'Unknow Error';
            dispatch({ type: 'SET_LOADING', payload: false });
            setModal(() => ({ ...modal, active: true, message: errorMsg }));
        }
    };

    const onCloseModal = () => {
        if (modal.redirect) navigate('/dashboard');
        else setModal(() => ({ ...modal, active: false }));
    };

    if (member.role !== 'admin') return (
        <h2 style={{ textAlign: 'center', marginTop: '40px' }}>
            403 Forbidden! - You don't have access!
        </h2>    
    );
    return(
        <div>
            <Form role={member.role} onFormSubmit={handleFormSubmit} />
            <Modal open={modal.active} passiveModal modalHeading={modal.message} onRequestClose={onCloseModal}/>
        </div>
    );
}

export default Add;