import React from 'react';
import Form from '../Form';
import { Modal } from 'carbon-components-react';
import { useSubmit } from '../../hooks/useSubmit';

const Add = () => {
    const { state, modal, handleFormSubmit, onCloseModal, handleFormInvalid } = useSubmit();
    const { member } = state;

    if (member.role !== 'admin') return (
        <h2 style={{ textAlign: 'center', marginTop: '40px' }}>
            403 Forbidden! - You don't have access!
        </h2>    
    );
    return(
        <div>
            <Form 
            role={member.role}
            onFormSubmit={handleFormSubmit}
            onInvalid={handleFormInvalid} />
            <Modal
            open={modal.active}
            passiveModal
            modalHeading={modal.message}
            onRequestClose={onCloseModal} />
        </div>
    );
}

export default Add;