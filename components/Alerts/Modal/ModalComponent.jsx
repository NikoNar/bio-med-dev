import React, {useState} from 'react';
import Modal from 'react-modal'
import ModalStyle from './modal.module.scss'


Modal.setAppElement('#__next')




const ModalComponent = ({error, callBack, isOpen, text}) => {

    return (
        <Modal
            isOpen={isOpen}
            className={error ? ModalStyle.MyModal + ' ' + ModalStyle.Error : ModalStyle.MyModal + ' ' + ModalStyle.Success}
        >
            <p>{error ? error : text}</p>
            <button onClick={callBack} className={error ? ModalStyle.ErrorBtn : ModalStyle.SuccessBtn}>{error ? 'X' : 'OK'}</button>
        </Modal>
    );
};

export default ModalComponent;