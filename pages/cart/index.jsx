import React, {useEffect, useState} from 'react';
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import CartStyle from './cart.module.scss'
import ContactInfoWithSelect from "../../components/ContactUs/ContacInfoWithSelect/ContacInfoWithSelect";
import {contactInfoUrl} from "../../utils/url";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import {getAllOrdersItem, removeAllOrdersAction, removeCartItem} from "../../redux/actions/setOrderAction";
import {useDispatch, useSelector} from "react-redux";
import useTranslation from "next-translate/useTranslation";



const Cart = ({contactInfo}) => {
    const {t} = useTranslation()

    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)

    const deleteAllOrders = async () => {
        await dispatch(removeAllOrdersAction())
    }


    useEffect(() => {
        dispatch(getAllOrdersItem())
    }, [])

   // console.log(orders);

    return (
        <section className={CartStyle.Cart}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        <div className={CartStyle.Title}>
                            <h4>Զամբյուղ</h4>
                        </div>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-lg-6'}>
                        {
                            orders && orders.length > 0
                            ?
                            <div className={'row'}>
                            <div className={'col-lg-12 mt-5'}>
                                <div className={CartStyle.RemoveAll} onClick={deleteAllOrders}>
                                    <span>{t('common:clear_all')}</span>
                                </div>
                            </div>
                        </div>
                            : ''
                        }

                        <div className={'row'}>
                            {
                                orders ? orders.map((o, index) => {
                                    return (
                                        <div
                                            className={'col-lg-12 mt-4'} key={o.number}>
                                            <AnalyzesCard
                                                inner={o}
                                                icon={true}
                                                index={index}
                                              />
                                        </div>
                                    )

                                }) : ''
                            }
                        </div>
                    </div>
                    <div className={'col-lg-6'}>
                        <CheckoutForm info={{contactInfo}} orders={orders}/>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-lg12'}>
                        <ContactInfoWithSelect contactInfo={contactInfo}/>
                    </div>
                </div>
            </div>
        </section>
    );
};


export async function getServerSideProps() {

    const contactInfo = await fetch(contactInfoUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)


    return {
        props: {
            contactInfo
        }
    }
}

export default Cart;