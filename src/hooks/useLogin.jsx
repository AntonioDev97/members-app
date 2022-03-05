import { useEffect, useState } from "react";
import { useMemberContext } from "../Member.context";
import { useNavigate } from "react-router-dom";
import Validator from 'validator';
import { AxiosAction } from "../utils/axios-action";

export const useLogin = (setSession) => {
    const navigate = useNavigate();
    useEffect(() => { if (state.token) navigate('/dashboard') });
    
    const { dispatch, state } = useMemberContext();
    const [error, setError] = useState(null);
    const [loginInput, setLoginInput] = useState({
        email: '', 
        passw: '',
        invalidEmail: false,
        invalidPassw: false
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const validation = name === 'email' ? 
        { invalidEmail: (!Validator.isEmail(value)) } : 
        { invalidPassw: (value.length < 6) };
        setLoginInput(values => ({ 
            ...values,
            ...validation,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_LOADING', payload: true });
        if(!loginInput.invalidEmail && !loginInput.invalidPassw) {
            try {
                const endpoint = process.env.REACT_APP_ENDPOINT_LOGIN;
                const responseLogin = await AxiosAction.post(endpoint, { 
                    email: loginInput.email,
                    passw: loginInput.passw
                });
                const member = responseLogin.data?.data;
                setError(null); 
                setSession(member);
                dispatch({ type: 'SET_LOADING', payload: false });
                navigate('/dashboard');
            } catch (error) {
                const errorMsg = error.response && error.response.data ? 
                error.response.data.message : 'Unknow Error';
                setError(errorMsg);
                dispatch({ type: 'SET_LOADING', payload: false }); 
            }
        } else {
            dispatch({ type: 'SET_LOADING', payload: false }); 
            setError('Complete your credentials');
        }
    };

    return {
        handleChange,
        handleSubmit,
        loginInput,
        error
    }
};