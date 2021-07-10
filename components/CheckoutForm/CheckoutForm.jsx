import React, {useEffect, useState} from 'react';
import CheckoutStyle from './checkout.module.scss'
import SelectBox from "../SelectBox/SelectBox";
import Button from "../Button/Button";
import DatePicker from 'react-datepicker'
import {resetIdCounter, Tab, TabList, TabPanel} from "react-tabs";
import TabStyle from "../Tab/tab.module.scss";
import TabButtons from "../TabButtons/TabButtons";
import {homeCallOrdersUrl, orderUrl} from "../../utils/url";
import dynamic from "next/dynamic";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: false})
import HomeCallCloudText from "../Alerts/HomeCallCloudText/HomeCallCloudText";
import useTranslation from "next-translate/useTranslation";
import RequiredFields from "../Alerts/RequiredFields/RequiredFields";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserAction} from "../../redux/actions/getCurrentUserAction";
import {getAllOrdersItem} from "../../redux/actions/setOrderAction";
import {getNavBarItems} from "../../redux/actions/navBarAction";




const reserveSchema = Yup.object().shape({
    first_name: Yup.string().matches(/^([^1-9]*)$/).required(),
    reserveDate: Yup.string().required(),
    reserveTime: Yup.string().required(),
    reserveAddress: Yup.object().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().required(),
})

const homeCallSchema = Yup.object().shape({
    homeCallFullName: Yup.string().matches(/^([^1-9]*)$/).required(),
    homeCallDate: Yup.string().required(),
    homeCallAddress: Yup.string().required(),
    homeCallCity: Yup.string(),
    homeCallCountry: Yup.string(),
    homeCallTime: Yup.string().required(),
    homeCallEmail: Yup.string().email().required(),
    homeCallPhoneNumber: Yup.string().required(),
})






const CheckoutForm = ({info, orders, addresses, token}) => {

    const user = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const backgroundColor = 'linear-gradient(208deg,' + 'transparent 11px,' + '#52A4E3 0)'
    const customStyle = {
        control: (provided) => ({
            ...provided,
            boxShadow: "none",
            border: "none",
            backgroundColor: "#f5faff",
            padding: 6,
        }),
        container: (provided) => ({
            ...provided,
            border: "1px solid transparent",
            borderColor: errorsReserve.reserveBranches ? '#ff0000' : 'transparent',
            boxShadow: "none",
            backgroundColor: "",
            marginBottom: '30px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused && "#F5FAFF",
            color: "#183042",
            fontSize: "16px",
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
        }),
        valueContainer: (provided, state) => ({
            ...provided,
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            paddingTop: 7,
            paddingBottom: 7,
        }),
    }

    /*Total Price Calculating*/
    const homeCallPrice = 5000
    const [totalPrice, setTotalPrice] = useState('0')
    const [totalHomeCallPrice, setTotalHomeCallPrice] = useState('0')

    const [tabDisabled, setTabDisabled] = useState(false)
    let calculateOrderItemsTotalPrice = '0'


    useEffect(() => {
        dispatch(getCurrentUserAction())
        setTabDisabled(orders && orders.some((o)=>o.shipping_class !== 'home-call'))

        calculateOrderItemsTotalPrice =  orders ? orders.reduce((acc, value)=>{
            return acc + (+value.sale_price ? +value.sale_price : +value.regular_price)
        }, 0) : 0
        setTotalPrice(calculateOrderItemsTotalPrice.toFixed(2) );
        setTotalHomeCallPrice(
            calculateOrderItemsTotalPrice !== 0 && homeCallPrice ? (calculateOrderItemsTotalPrice + homeCallPrice).toFixed(2) : calculateOrderItemsTotalPrice.toFixed(2))
    }, [orders])

    const {
        handleSubmit: handleSubmitReserve,
        control: controlReserve,
        reset: reserveReset,
        register: registerReserve,
        formState:{errors: errorsReserve}
    }= useForm({
        resolver: yupResolver(reserveSchema)
    });

    const {
        handleSubmit:handleSubmitHomeCall,
        control: controlHomeCall,
        reset: homeCallReset,
        register: registerHomeCall,
        formState:{errors: errorsHomeCall}
    } = useForm({
        resolver: yupResolver(homeCallSchema)
    });


    /*--- Reserve Form data ---*/
    const reserveOrderDate = new Date().toLocaleDateString()
    const reserveOrderTime = new Date().toLocaleTimeString().slice(0, 4)

    const handleSubmitReserveOrders = async (reserveData) => {
        const lineItems = orders.map(order=>{
            return {
                product_id: order.id,
                quantity: 1
            }
        })
        const data = {
            billing: {
                first_name: reserveData.first_name,
                last_name: "",
                address_1: reserveData.reserveAddress.label,
                address_2: '',
                city: 'Yerevan',
                state: 'Yerevan',
                postcode: '',
                country: 'Armenia',
                email: reserveData.email,
                phone: reserveData.phone,
            },
            customer_note: new Date(reserveData.reserveDate).toLocaleDateString() + ' ' + new Date(reserveData.reserveTime).toLocaleTimeString(),
            shipping:{
                first_name: reserveData.first_name,
                last_name: "",
                address_1: reserveData.reserveAddress.label,
                address_2: '',
                city: 'Yerevan',
                state: 'Yerevan',
                postcode: '',
                country: 'Armenia'
            },
            line_items: lineItems,
            payment_method: "cod",
            payment_method_title: "Cash on delivery",
            set_paid: false,
            shipping_lines: [
                {
                    method_id: "appointment",
                    method_title: "Appointment",
                    total: '0'
                }
            ]
        }

        await fetch(`${orderUrl}?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&customer_id=${user.user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data=>data)
            .then(()=> reserveReset({}))
    }

    /* ---- Home Call Form ----*/
    const [showAlert, setShowAlert] = useState(false)

    const homeCallAlert = (e,value)=>{
        e.stopPropagation()
        setShowAlert(value)
    }

    const homeCloudStyle = {
        display: showAlert ? 'block' : 'none'
    }
    const handleSubmitHomeCallOrders = async (homeCallData) => {
        const lineItems = orders.map(order=>{
            return {
                product_id: order.id,
                quantity: 1
            }
        })
        const data = {
            billing: {
                first_name: homeCallData.homeCallFullName,
                last_name: "",
                address_1: "",
                address_2: '',
                city: homeCallData.homeCallCity,
                state: homeCallData.homeCallCity,
                postcode: '',
                country: homeCallData.homeCallCountry,
                email: homeCallData.homeCallEmail,
                phone: homeCallData.homeCallPhoneNumber,
            },
            customer_note: new Date(homeCallData.homeCallDate).toLocaleDateString() + ' ' + new Date(homeCallData.homeCallTime).toLocaleTimeString(),
            shipping:{
                first_name: homeCallData.first_name,
                last_name: "",
                address_1: homeCallData.homeCallAddress,
                address_2: '',
                city: homeCallData.homeCallCity,
                state: homeCallData.homeCallCity,
                postcode: '',
                country: homeCallData.homeCallCountry
            },
            line_items: lineItems,
            payment_method: "cod",
            payment_method_title: "Cash on delivery",
            set_paid: false,
            shipping_lines: [
                {
                    method_id: "flat-rate",
                    method_title: "Flat rate",
                    total: '5000'
                }
            ]
        }
        await fetch(`${orderUrl}?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&customer_id=${user.user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                res.json()
                homeCallReset({})
            })
            .then(data=>data)
    }

    /*---- Form Validation ----*/

    return (
        <Tabs>
            <TabList className={TabStyle.TabList}>
                <Tab selectedClassName={TabStyle.Selected}><TabButtons text={t('common:reserve')}/></Tab>
                <Tab selectedClassName={TabStyle.Selected} disabled={tabDisabled} onClick={ tabDisabled ? (e)=>homeCallAlert(e,true) : null}><TabButtons text={t('common:home_call')}/>
                    <HomeCallCloudText callback={(e) => homeCallAlert(e, false)} style={homeCloudStyle}/>
                </Tab>
            </TabList>
            <TabPanel>
                <div className={CheckoutStyle.Form}>
                    <RequiredFields errors={errorsReserve}/>
                    <form onSubmit={handleSubmitReserve((reserveData) => handleSubmitReserveOrders(reserveData))}>
                        <input
                            placeholder={t('common:full_name')}
                            type="text"
                            name="first_name"
                            {...registerReserve('first_name')}
                            style={{borderColor: errorsReserve.first_name ? '#ff0000' : 'transparent'}}
                        />

                        <Controller
                            control={controlReserve}
                            name="reserveAddress"
                            rules={{ required: true }}
                            render={({field: {onChange, value, ref}}) => (
                                <SelectBox
                                    styles={customStyle}
                                    inputRef={ref}
                                    inputId={'checkoutBranch'}
                                    isSearchable={false}
                                    value={value}
                                    onChange={onChange}
                                    options={addresses}
                                    placeholder={<span style={{color: '#b0b8c0'}}>{t('common:select_branch')}</span>}
                                    components={{
                                        IndicatorSeparator: () => null,
                                    }}
                                />
                            )}
                        />
                        <div className={CheckoutStyle.DatePicker}>
                            <div className={'row'}>
                                <div className={'col-lg-6'}>
                                    <div className={errorsReserve.reserveDate ? CheckoutStyle.Date + ' ' + CheckoutStyle.DateWithError : CheckoutStyle.Date}>
                                        <Controller
                                            control={controlReserve}
                                            name="reserveDate"
                                            rules={{ required: true }}
                                            render={({field: {onChange, value}}) => (
                                                <DatePicker
                                                    selected={value}
                                                    onChange={onChange}
                                                    dateFormat='dd/MM/yyyy'
                                                    placeholderText={reserveOrderDate}
                                                    style={{width: "100%", borderColor: errorsReserve.reserveDate ? '#ff0000' : 'transparent'}}
                                                    withPortal
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    yearDropdownItemNumber={100}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className={'col-lg-6' + ' ' + CheckoutStyle.Portal}>
                                    <div className={errorsReserve.reserveTime ? CheckoutStyle.Time + ' ' + CheckoutStyle.TimeWithError : CheckoutStyle.Time}>
                                        <Controller
                                            control={controlReserve}
                                            name="reserveTime"
                                            rules={{ required: true }}
                                            render={({field: {onChange, value}}) => (
                                                <DatePicker
                                                    style={{width: "100%"}}
                                                    selected={value}
                                                    onChange={onChange}
                                                    showTimeSelect
                                                    placeholderText={reserveOrderTime}
                                                    withPortal
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Ժամը"
                                                    dateFormat="HH:mm"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input
                            placeholder={t('common:phone_number')}
                            type="tel"
                            name="phone"
                            {...registerReserve('phone')}
                            style={{borderColor: errorsReserve.phone ? '#ff0000' : 'transparent'}}
                        />
                        <input
                            placeholder={t('common:email')}
                            type="email"
                            name="email"
                            {...registerReserve('email')}
                            style={{borderColor: errorsReserve.email ? '#ff0000' : 'transparent'}}
                        />
                        <Button backgroundColor={backgroundColor} text={t('common:reserve')} type={'submit'} disabled={!orders || orders.length === 0}/>
                    </form>
                    <div className={CheckoutStyle.Price}>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.Total}>
                            <p>{t('common:total')}</p>
                            <strong>{totalPrice} <span className={'_icon-amd'}> </span></strong>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <div className={CheckoutStyle.Form}>
                    <RequiredFields errors={errorsHomeCall}/>
                    <form onSubmit={handleSubmitHomeCall((homeCallData) => handleSubmitHomeCallOrders(homeCallData))}>
                        <input
                            placeholder={t('common:full_name')}
                            type="text"
                            name="homeCallFullName"
                            {...registerHomeCall('homeCallFullName')}
                            style={{borderColor: errorsHomeCall.homeCallFullName ? '#ff0000' : 'transparent'}}
                        />
                        <div className={CheckoutStyle.DatePicker}>
                            <div className={'row'}>
                                <div className={'col-lg-6'}>
                                    <div className={errorsHomeCall.homeCallDate ? CheckoutStyle.Date + ' ' + CheckoutStyle.DateWithError : CheckoutStyle.Date}>
                                        <Controller
                                            control={controlHomeCall}
                                            name="homeCallDate"
                                            rules={{ required: true }}
                                            render={({field: {onChange, value}}) => (
                                                <DatePicker
                                                    selected={value}
                                                    onChange={onChange}
                                                    dateFormat='dd/MM/yyyy'
                                                    placeholderText={reserveOrderDate}
                                                    style={{width: "100%"}}
                                                    withPortal
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    yearDropdownItemNumber={100}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className={'col-lg-6' + ' ' + CheckoutStyle.Portal}>
                                    <div className={errorsHomeCall.homeCallTime ? CheckoutStyle.Time + ' ' + CheckoutStyle.TimeWithError : CheckoutStyle.Time}>
                                        <Controller
                                            control={controlHomeCall}
                                            name="homeCallTime"
                                            rules={{ required: true }}
                                            render={({field: {onChange, value}}) => (
                                                <DatePicker
                                                    style={{width: "100%"}}
                                                    selected={value}
                                                    onChange={onChange}
                                                    showTimeSelect
                                                    placeholderText={reserveOrderTime}
                                                    withPortal
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Ժամը"
                                                    dateFormat="HH:mm"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input
                            placeholder={t('common:home_address')}
                            type="text"
                            name="homeCallAddress"
                            {...registerHomeCall('homeCallAddress')}
                            style={{borderColor: errorsHomeCall.homeCallAddress ? '#ff0000' : 'transparent'}}
                        />
                        <input
                            placeholder={t('common:yerevan')}
                            type="tel"
                            disabled={true}
                            name="homeCallCity"
                            defaultValue={t('common:yerevan')}
                            {...registerHomeCall('homeCallCity')}
                            style={{borderColor: errorsHomeCall.homeCallCity ? '#ff0000' : 'transparent'}}
                        />
                        <input
                            placeholder={t('common:armenia')}
                            type="tel"
                            disabled={true}
                            defaultValue={t('common:armenia')}
                            name="homeCallCountry"
                            {...registerHomeCall('homeCallCountry')}
                            style={{borderColor: errorsHomeCall.homeCallCountry ? '#ff0000' : 'transparent'}}
                        />
                        <input
                            placeholder={t('common:phone_number')}
                            type="tel"
                            name="homeCallPhoneNumber"
                            {...registerHomeCall('homeCallPhoneNumber')}
                            style={{borderColor: errorsHomeCall.homeCallPhoneNumber ? '#ff0000' : 'transparent'}}
                        />
                        <input
                            placeholder={t('common:email')}
                            type="email"
                            name="homeCallEmail"
                            {...registerHomeCall('homeCallEmail', {required: true})}
                            style={{borderColor: errorsHomeCall.homeCallEmail ? '#ff0000' : 'transparent'}}
                        />
                        <Button backgroundColor={backgroundColor} text={t('common:submit_order')} type={'submit'} disabled={!orders || orders.length === 0}/>
                    </form>
                    <div className={CheckoutStyle.Price}>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.CallHomePrice}>
                            <p>{t('common:home_call_price')}</p>
                            <strong>{homeCallPrice} <span className={'_icon-amd'}> </span></strong>
                        </div>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.Total}>
                            <p>{t('common:total')}</p>
                            <strong>{totalHomeCallPrice} <span className={'_icon-amd'}> </span></strong>
                        </div>
                    </div>
                </div>
            </TabPanel>
        </Tabs>
    );
};

export function getStaticProps() {
    resetIdCounter();

    return {
        props: {}
    }
}


export default CheckoutForm;
