import { AxiosAction } from '../utils/axios-action';
import { useState } from 'react';
import { useMemberContext } from '../Member.context';
import { TransformMemberDataSubmit } from '../utils/transform-data';
import { useNavigate } from 'react-router-dom';

export const useSubmit = (id = null) => {
    const { dispatch, state } = useMemberContext();
    const [ modal, setModal ] = useState({ active: false, message: 'Unknow message', redirect: false });
    const { token } = state;
    const navigate = useNavigate();

    const handleFormSubmit = async (data) => {
        const body = TransformMemberDataSubmit({ ...data });
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const method = id ? 'put' : 'post';
            const endpoint = id ? `${process.env.REACT_APP_ENDPOINT_UPDATE}/${id}` : process.env.REACT_APP_ENDPOINT_ADD;
            const response = await AxiosAction[method](endpoint, body, token);
            const { status, message } = response.data;
            dispatch({ type: 'SET_LOADING', payload: false });
            setModal(() => ({ ...modal, active: true, message, redirect: (status === 200) }));
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'Unknow Error';
            dispatch({ type: 'SET_LOADING', payload: false });
            setModal(() => ({ ...modal, active: true, message: errorMsg }));
        }
    };
    
    const onCloseModal = () => {
        if (modal.redirect) navigate('/dashboard');
        else setModal(() => ({ ...modal, active: false }));
    };

    const handleFormInvalid = () => setModal(() => ({ ...modal, active: true, message: 'Invalid Form!' }));

    return {
        dispatch,
        state,
        modal,
        setModal,
        handleFormSubmit,
        handleFormInvalid,
        onCloseModal
    };
};