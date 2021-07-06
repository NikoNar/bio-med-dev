import React, {useEffect, useState} from 'react';
import AnalyzesCard from "../../components/AnalyzesCard/AnalyzesCard";
import CartStyle from './cart.module.scss'
import ContactInfoWithSelect from "../../components/ContactUs/ContacInfoWithSelect/ContacInfoWithSelect";
import {contactInfoUrl, locationsUrl} from "../../utils/url";
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

    const addresses = contactInfo.map((cont)=>{
        return{
            value: cont.slug,
            label: cont.location_address,
            email: cont.location_email,
            tel: cont.location_phone
        }
    })


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
                                orders && orders.length > 0 ? orders.map((o, index) => {
                                    return (
                                        <div
                                            className={'col-lg-12 mt-4'} key={o.id}>
                                            <AnalyzesCard
                                                inner={o}
                                                icon={true}
                                                index={index}
                                              />
                                        </div>
                                    )

                                }) : t('common:your_cart_is_empty')
                            }
                        </div>
                    </div>
                    <div className={'col-lg-6'}>
                        <CheckoutForm info={{contactInfo}} orders={orders}/>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-lg12'}>
                        <ContactInfoWithSelect addresses={addresses}/>
                    </div>
                </div>
            </div>
        </section>
    );
};


export async function getServerSideProps(ctx) {
    //console.log(JSON.parse(ctx.req.cookies.currentUser))


    const contactInfo = await fetch(`${locationsUrl}?status=publish&lang=${ctx.locale}`)
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            contactInfo
        }
    }
}

export default Cart;
