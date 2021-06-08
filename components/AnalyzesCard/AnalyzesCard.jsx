import React, {useEffect, useState} from 'react';
import AStyle from './analyzes-card.module.scss'
import Link from "next/link";
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserAction} from "../../redux/actions/getCurrentUserAction";
import {addItemToCart,  removeCartItem} from "../../redux/actions/setOrderAction";
import EmergencyIcon from "../SVGIcons/Emergency/EmergencyIcon";
import CloseIcon from "../SVGIcons/CloseIcon/CloseIcon";

const AnalyzesCard = ({inner, icon, index}) => {

    const backgroundColor = 'linear-gradient(208deg,' + 'transparent 11px,' + '#52A4E3 0)'

    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    const [buttonText, setButtonText] = useState('ԱՎԵԼԱՑՆԵԼ')

    const text = 'ԱՎԵԼԱՑՆԵԼ'


    useEffect(() => {
        dispatch(getCurrentUserAction())
    }, [])

    const handleAddToCart = (data) => {
        dispatch(addItemToCart(data))
    }

    const deleteOrder = (index) => {
        dispatch(removeCartItem(index))
    }

    return (
        <div className={AStyle.Item}>
            <div className={'row'}>
                <div className={'col-lg-12'}>
                    {
                        icon ? <div className={AStyle.RemoveBtn}>
                            <button onClick={()=>deleteOrder(index)}><CloseIcon/></button>
                        </div> : ''
                    }
                    <div className={AStyle.Top}>
                        <small className={AStyle.Number}>№{inner.number}</small>
                        <div className={AStyle.Title}>
                            <span>{inner.title}</span>
                        </div>
                        <div className={AStyle.Desc}>
                            <p>{inner.body}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'row' + ' ' + AStyle.Info}>
                <div className={'col-12 col-sm-4 col-md-4 col-lg-4'}>
                    <div className={AStyle.Price}>
                        <p
                            className={inner.compare_price ? AStyle.SellPrice : null}
                            style={{visibility: inner.compare_price ? 'visible' : 'hidden'}}
                        >{inner.price}<span>AMD</span></p>
                        <p>{inner.compare_price ? inner.compare_price : inner.price}<span>AMD</span></p>
                    </div>
                </div>
                <div className={'col-12 col-sm-8 col-md-8 col-lg-8'}>
                    <div className={AStyle.Options}>
                        <div className={AStyle.Emergency}>
                            <Link href={'/en'}>
                                <a>
                                    {inner.callHome ? <EmergencyIcon/> : null}
                                </a>
                            </Link>
                        </div>
                        <Button text={buttonText} backgroundColor={backgroundColor}
                                callBack={() => handleAddToCart({...inner, userId: currentUser.id}, text)}
                                icon={icon}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AnalyzesCard;