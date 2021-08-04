import React, {useEffect, useState} from 'react';
import AStyle from './analyzes-card.module.scss'
import Link from "next/link";
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserAction} from "../../redux/actions/getCurrentUserAction";
import {addItemToCart, removeCartItem} from "../../redux/actions/setOrderAction";
import EmergencyIcon from "../SVGIcons/Emergency/EmergencyIcon";
import CloseIcon from "../SVGIcons/CloseIcon/CloseIcon";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import parse from 'html-react-parser';
import ModalComponent from "../Alerts/Modal/ModalComponent";


const AnalyzesCard = ({inner, icon, index}) => {
    const {t} = useTranslation()
    const router = useRouter()
    const backgroundColor = 'linear-gradient(208deg,' + 'transparent 11px,' + '#52A4E3 0)'
    const orders = useSelector(state => state.orders)

    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [prod, setProd] = useState({})
    const [buttonText, setButtonText] = useState(t('common:add_to_cart'))
    const [inCart, setInCart] = useState(false)
    //const [error, setError] = useState(false)



    const handleAddToCart = (data, text, index) => {

        setProd(data);
        dispatch(addItemToCart(data, setIsOpen, setInCart))
        setButtonText(text)
        if(inCart){
            console.log(index);
            dispatch(removeCartItem(index, setInCart))
        }
    }

    const text = inCart ? t('common:add_to_cart') : 'Զամբյուղում է'

    const deleteOrder = (index) => {
        dispatch(removeCartItem(index, setInCart))
    }


    return (
        <>
            <ModalComponent
                isOpen={isOpen}
                callBack={()=>setIsOpen(false)}
                text={inCart ? `${prod.name}` + ' ' + t('common:add_to_card_message') : 'In Cart'}
                t={t}
                link={`${router.locale}/cart`}
            />
            <div className={AStyle.Item}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        {
                            icon ? <div className={AStyle.RemoveBtn}>
                                <button onClick={() => deleteOrder(index)}><CloseIcon/></button>
                            </div> : ''
                        }
                        <div className={AStyle.Top}>
                            <small className={AStyle.Number}>№ {inner.sku}</small>
                            <div className={AStyle.CategoryName}>
                                <span>{inner.categories[0].name}</span>
                            </div>
                            <div className={AStyle.Title}>
                                <Link href={`/researches/${inner.slug}`}>
                                    <a><span>{inner.name}</span></a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'row' + ' ' + AStyle.Info}>
                    <div className={'col-12 col-sm-4 col-md-4 col-lg-4'}>
                        <div className={AStyle.Price}>
                            <p
                                className={inner.on_sale ? AStyle.SellPrice : null}
                                style={{display: inner.on_sale ? 'inline-block' : 'none'}}
                            >{inner.regular_price}<span className={'_icon-amd'}></span></p>
                            <p>{inner.on_sale ? inner.sale_price : inner.regular_price}<span
                                className={'_icon-amd'}></span></p>
                        </div>
                    </div>
                    <div className={'col-12 col-sm-8 col-md-8 col-lg-8'}>
                        <div className={AStyle.Options}>
                            <div className={AStyle.Emergency}>
                                <Link href={'/'}>
                                    <a>
                                        {inner.shipping_class === `home-call` ? <EmergencyIcon/> : null}
                                    </a>
                                </Link>
                            </div>
                            <Button text={buttonText}
                                    backgroundColor={backgroundColor}
                                    icon={icon}
                                    padding={'10px'}
                                    callBack={
                                        currentUser ? () => handleAddToCart({...inner, userId: currentUser.id}, text, index) :
                                            () => {
                                                router.push('/account')
                                            }
                                    }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default AnalyzesCard;
