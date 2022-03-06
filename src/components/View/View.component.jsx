import React, { useEffect } from 'react';
import Form from '../Form'
import PropTypes from 'prop-types';
import { AxiosAction } from '../../utils/axios-action';
import { Modal } from 'carbon-components-react';
import { TransformMemberDataById } from '../../utils/transform-data';
import { useSubmit } from '../../hooks/useSubmit';


const View = ({ id }) => {
    const { 
        state,
        modal,
        dispatch,
        setModal,
        handleFormSubmit,
        handleFormInvalid,
        onCloseModal
    } = useSubmit(id);
    const { member, member_by_id, token } = state;

    useEffect(() => {
        const setMemberById = async () => {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const endpoint = `${process.env.REACT_APP_ENDPOINT_BY_ID}/${id}`;
                const response = await AxiosAction.get(endpoint, token);
                const Member = TransformMemberDataById(response.data?.data);
                dispatch({ type: 'SET_MEMBER_BY_ID', payload: Member });
                dispatch({ type: 'SET_LOADING', payload: false });
            } catch (error) {
                console.error(error);
                const errorMsg = error.response && error.response.data ? 
                error.response.data.message : error.message || 'Unknow Error';
                dispatch({ type: 'SET_LOADING', payload: false });
                setModal({ active: true, message: errorMsg, redirect: false });
            };
        };
        setMemberById();
    }, [setModal, dispatch, token, id]);

    const handleDelete = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const endpoint = `${process.env.REACT_APP_ENDPOINT_DELETE}/${id}`;
            const response = await AxiosAction.delete(endpoint, token);
            const { status, message } = response.data;
            dispatch({ type: 'SET_LOADING', payload: false });
            setModal(() => ({ ...modal, active: true, message, redirect: (status === 200) }));
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Unknow Error';
            dispatch({ type: 'SET_LOADING', payload: false });
            setModal(() => ({ ...modal, active: true, message: errorMsg }));
        };
    };

    return(
        <div>
            <Form 
            role={member.role}
            data={member_by_id}
            onFormSubmit={handleFormSubmit}
            onDelete={handleDelete}
            onInvalid={handleFormInvalid} />
            <Modal
            open={modal.active}
            passiveModal
            modalHeading={modal.message}
            onRequestClose={onCloseModal} />
        </div>
    );
};

View.propTypes = {
    id: PropTypes.string.isRequired
}

export default View;