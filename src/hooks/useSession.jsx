const useSession = (dispatch=null) => {
    const getSession = () => {
        const MemberString = localStorage.getItem('member');
        const Member = MemberString ? JSON.parse(MemberString) : null;
        return Member;
    };

    const setSession = memberToken => {
        localStorage.setItem('member', JSON.stringify(memberToken));
        dispatch({ type: 'SET_MEMBER', payload: memberToken });
    };

    const destroySession = () => {
        localStorage.clear();
        dispatch({ type: 'SET_LOGOUT', payload: true });
    };

    return { setSession, getSession, destroySession };
};

export default useSession;