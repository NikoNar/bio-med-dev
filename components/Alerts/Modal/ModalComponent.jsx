import React, {useState} from 'react';
import Modal from 'react-modal'
import ModalStyle from './modal.module.scss'
import parse from 'html-react-parser';
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";

Modal.setAppElement('#__next')

const customStyles = {
    content: {},
    overlay: {zIndex: 1000}
};

const ModalComponent = ({error, callBack, isOpen, text, link, hasError, user, linkText}) => {
    const {t} = useTranslation()
    const router = useRouter()
    return (
        <Modal
            isOpen={isOpen && isOpen}
            className={error ? ModalStyle.MyModal + ' ' + ModalStyle.Error : ModalStyle.MyModal + ' ' + ModalStyle.Success}
            style={customStyles}
        >
            <p>{error ? parse(error) : text}</p>
            <div>{link ? <span onClick={()=>router.push(link)}>{linkText}</span> : ''}</div>
            <button onClick={callBack}
                    className={error || hasError ? ModalStyle.ErrorBtn : ModalStyle.SuccessBtn}>{error ? 'X' : 'OK'}</button>
        </Modal>
    );
};

export default ModalComponent;
