import React, { useReducer, useContext } from 'react';
import useSession from './hooks/useSession';

const MemberStateContext = React.createContext();
const MemberDispatchContext = React.createContext();

const initialValue = { 
    loading: false,
    member: null,
    token: null,
    member_list: null,
    member_by_id: null,
    error: null,
};
const reducer = (state, action) => {
    const { type, payload } = action;
    const types = {
        SET_LOADING: () => ({ ...state, loading: payload }),
        SET_MEMBER: () => ({ ...state, member: payload.member, token: payload.token }),
        SET_TOKEN: () => ({ ...state, token: payload.token }),
        SET_MEMBER_LIST: () => ({ ...state, member_list: payload }),
        SET_MEMBER_BY_ID: () => ({ ...state, member_by_id: payload }),
        SET_LOGOUT: () => ({ ...state, ...initialValue }),
        SET_ERROR: () => ({ ...state, error: payload }),
    };
    return types[type] ? types[type]() : state;
};

const MemberContext = ({ children }) => {
    const { getSession } = useSession();
    const MemberSession = getSession();
    const initalValueReducer = {
        ...initialValue,
        member: MemberSession && MemberSession.member ? MemberSession.member : null,
        token: MemberSession && MemberSession.token ? MemberSession.token : null,
    };
    const [ state, dispatch ] = useReducer(reducer, initalValueReducer);

    return (
        <MemberDispatchContext.Provider value={dispatch}>
            <MemberStateContext.Provider value={state}>
                { children }
            </MemberStateContext.Provider>
        </MemberDispatchContext.Provider>
    );
};

const useMemberContext = () => {
    const dispatch = useContext(MemberDispatchContext);
    const state = useContext(MemberStateContext);
    if (!dispatch) throw new Error("Must set a dispatch provider");
    if (!state) throw new Error("Must set a state provider");
    return { dispatch, state };
};

export {
    MemberContext,
    useMemberContext
};