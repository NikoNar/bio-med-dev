import React, {useState} from 'react';
import Modal from 'react-modal'
import ModalStyle from './modal.module.scss'


Modal.setAppElement('#__next')




const ModalComponent = ({error, callBack, isOpen}) => {

    return (
        <Modal
            isOpen={isOpen}
            className={ModalStyle.MyModal}
        >
            <p>{error}</p>
            <button onClick={callBack}>X</button>
        </Modal>
    );
};

export default ModalComponent;