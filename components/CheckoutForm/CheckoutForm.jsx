import React, {useCallback, useEffect, useMemo, useState} from 'react';
import CheckoutStyle from './checkout.module.scss'
import SelectBox from "../SelectBox/SelectBox";
import Button from "../Button/Button";
import DatePicker from 'react-datepicker'
import {resetIdCounter, Tab, TabList, TabPanel} from "react-tabs";
import TabStyle from "../Tab/tab.module.scss";
import TabButtons from "../TabButtons/TabButtons";
import {orderUrl, paymentApiUrl, paymentCheckingApiUrl} from "../../utils/url";
import dynamic from "next/dynamic";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import HomeCallCloudText from "../Alerts/HomeCallCloudText/HomeCallCloudText";
import useTranslation from "next-translate/useTranslation";
import RequiredFields from "../Alerts/RequiredFields/RequiredFields";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserAction} from "../../redux/actions/getCurrentUserAction";
import ModalComponent from "../Alerts/Modal/ModalComponent";
import {setCookie} from "nookies";
import {useRouter} from "next/router";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import getDay from "date-fns/setHours";

const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: false})


const FormData = require('form-data');


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


const CheckoutForm = ({info, orders, addresses, loc, deleteAllOrders}) => {
    const router = useRouter()
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
    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState('')
    const [tabDisabled, setTabDisabled] = useState(false)
    const [defaultCity, setDefaultCity] = useState(t('common:yerevan'))
    const [defaultCountry, setDefaultCountry] = useState(t('common:armenia'))
    const [paymentMethod, setPaymentMethod] = useState('')
    const [error, setError] = useState(false)
    const [linkText, setLinkText] = useState('')
    const [availableTimes, setAvailableTimes] = useState([])
    //const [minutes, setMinutes] = useState()
    //const [hours, setHours] = useState()
    const [selectedDate, setSelectedDate] = useState(null);
    let calculateOrderItemsTotalPrice = '0'

    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 20)
    );


    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0;
    };


    /*const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 0), 9)
    );*/

    useEffect(() => {
        const selectedDay = selectedDate ? selectedDate.getDay() : null
        console.log('selectedDay', selectedDay)
        if (selectedDay === 6) {
            setAvailableTimes(
                [
                    setHours(setMinutes(new Date(), 0), 9),
                    setHours(setMinutes(new Date(), 15), 9),
                    setHours(setMinutes(new Date(), 30), 9),
                    setHours(setMinutes(new Date(), 45), 9),
                    setHours(setMinutes(new Date(), 0), 10),
                    setHours(setMinutes(new Date(), 15), 10),
                    setHours(setMinutes(new Date(), 30), 10),
                    setHours(setMinutes(new Date(), 45), 10),
                    setHours(setMinutes(new Date(), 0), 11),
                    setHours(setMinutes(new Date(), 15), 11),
                    setHours(setMinutes(new Date(), 30), 11),
                    setHours(setMinutes(new Date(), 45), 11),
                    setHours(setMinutes(new Date(), 0), 12),
                    setHours(setMinutes(new Date(), 15), 12),
                    setHours(setMinutes(new Date(), 30), 12),
                    setHours(setMinutes(new Date(), 45), 12),
                    setHours(setMinutes(new Date(), 0), 13),
                    setHours(setMinutes(new Date(), 15), 13),
                    setHours(setMinutes(new Date(), 30), 13)
                ]
            )
        }else{
            setAvailableTimes([
                setHours(setMinutes(new Date(), 30), 8),
                setHours(setMinutes(new Date(), 45), 8),
                setHours(setMinutes(new Date(), 0), 9),
                setHours(setMinutes(new Date(), 15), 9),
                setHours(setMinutes(new Date(), 30), 9),
                setHours(setMinutes(new Date(), 45), 9),
                setHours(setMinutes(new Date(), 0), 10),
                setHours(setMinutes(new Date(), 15), 10),
                setHours(setMinutes(new Date(), 30), 10),
                setHours(setMinutes(new Date(), 45), 10),
                setHours(setMinutes(new Date(), 0), 11),
                setHours(setMinutes(new Date(), 15), 11),
                setHours(setMinutes(new Date(), 30), 11),
                setHours(setMinutes(new Date(), 45), 11),
                setHours(setMinutes(new Date(), 0), 12),
                setHours(setMinutes(new Date(), 15), 12),
                setHours(setMinutes(new Date(), 30), 12),
                setHours(setMinutes(new Date(), 45), 12),
                setHours(setMinutes(new Date(), 0), 13),
                setHours(setMinutes(new Date(), 15), 13),
                setHours(setMinutes(new Date(), 30), 13),
                setHours(setMinutes(new Date(), 45), 13),
                setHours(setMinutes(new Date(), 0), 14),
                setHours(setMinutes(new Date(), 15), 14),
                setHours(setMinutes(new Date(), 30), 14),
                setHours(setMinutes(new Date(), 45), 14),
                setHours(setMinutes(new Date(), 0), 15),
                setHours(setMinutes(new Date(), 15), 15),
                setHours(setMinutes(new Date(), 30), 15)
            ])
        }
    }, [selectedDate])

    console.log(availableTimes);

    useEffect(() => {
        setDefaultCity(t('common:yerevan'))
        setDefaultCountry(t('common:armenia'))
        dispatch(getCurrentUserAction())
        setTabDisabled(orders && orders.some((o) => o.shipping_class !== 'home-call'))
        calculateOrderItemsTotalPrice = orders ? orders.reduce((acc, value) => {
            return acc + (+value.sale_price ? +value.sale_price : +value.regular_price)
        }, 0) : 0
        setTotalPrice(calculateOrderItemsTotalPrice.toFixed(2));
        setTotalHomeCallPrice(
            calculateOrderItemsTotalPrice !== 0 && homeCallPrice ? (calculateOrderItemsTotalPrice + homeCallPrice).toFixed(2) : calculateOrderItemsTotalPrice.toFixed(2))
    }, [orders, loc])

    const {
        handleSubmit: handleSubmitReserve,
        control: controlReserve,
        reset: reserveReset,
        register: registerReserve,
        formState: {errors: errorsReserve}
    } = useForm({
        resolver: yupResolver(reserveSchema)
    });

    const {
        handleSubmit: handleSubmitHomeCall,
        control: controlHomeCall,
        reset: homeCallReset,
        register: registerHomeCall,
        formState: {errors: errorsHomeCall}
    } = useForm({
        resolver: yupResolver(homeCallSchema)
    });


    /*--- Reserve Form data ---*/
    const reserveOrderDate = new Date().toLocaleDateString()
    const reserveOrderTime = new Date().toLocaleTimeString('it-IT').slice(0, 5)


    const handleSubmitReserveOrders = async (reserveData) => {
        const lineItems = orders.map(order => {
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
            shipping: {
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
            payment_method: paymentMethod,
            payment_method_title: paymentMethod,
            set_paid: false,
            shipping_lines: [
                {
                    method_id: "appointment",
                    method_title: "Appointment",
                    total: '0'
                }
            ]
        }
        if (paymentMethod === '') {
            setIsOpen(true)
            setText(t('common:payment_error_message'))
        }
        if (!user) {
            setIsOpen(true)
            setText(t('common:confirm_order_message'))
            setLinkText(t('common:account_link'))
        } else {
            await fetch(`${orderUrl}?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&customer_id=${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (paymentMethod === 'cod') {
                        setIsOpen(true)
                        setText(t('common:checkout_success_message'))
                        deleteAllOrders()
                        return data
                    }
                    if (paymentMethod === 'acba_gateway') {
                        handleSubmitWithAcba(data)
                    }
                })
                .then(() => reserveReset({}))
        }
    }

    /* ---- Home Call Form ----*/
    const [showAlert, setShowAlert] = useState(false)

    const homeCallAlert = (e, value) => {
        e.stopPropagation()
        setShowAlert(value)
    }

    const homeCloudStyle = {
        display: showAlert ? 'block' : 'none'
    }

    const handleSubmitHomeCallOrders = async (homeCallData) => {
        const lineItems = orders.map(order => {
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
            shipping: {
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
        if (user) {
            await fetch(`${orderUrl}?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&customer_id=${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (paymentMethod === 'cod') {
                        setIsOpen(true)
                        setText(t('common:checkout_success_message'))
                        return data
                    }
                    if (paymentMethod === 'acba_gateway') {
                        handleSubmitWithAcba(data)
                    }
                })
                .then(() => homeCallReset({}))
        } else {
            setIsOpen(true)
            setText(t('common:confirm_order_message'))
            setLinkText(t('common:account_link'))
        }
    }
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }
    const getUserOrderStatus = async (id, orderId) => {
        /*const data = new FormData();
        data.append("order_id", id);
        data.append("orderId", orderId);*/
        await fetch(`${paymentCheckingApiUrl}?order_id=${id}&orderId=${orderId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setIsOpen(true)
                data.status ? setText(data.message) : setError(data.message)
                data.status ? deleteAllOrders() : null
                //router.push('/cart')
            })
    }
    const handleSubmitWithAcba = async (orderData) => {
        /*const data = new FormData();
        data.append("orderNumber", `${orderData.id}`);
        data.append("returnUrl", `${mainUrl}/cart?order_id=${orderData.id}`);
        data.append("language", loc);*/

        /* const newData = {
             orderNumber: orderData.id,
             returnUrl: `${mainUrl}/cart?order_id=${orderData.id}`,
             language: loc
         }*/

        //const returnUrl = `${mainUrl}/cart&order_id=${orderData.id}`

        await fetch(`${paymentApiUrl}?orderNumber=${orderData.id}&language=${loc}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                if (result.result === 'error' || result.errorMessage) {
                    setIsOpen(true)
                    setText(result.message ? result.message : result.errorMessage)
                } else {
                    router.push(result.formUrl)
                }
            })
            .catch(error => console.log('error', error));
    }

    useMemo(() => {
        if (router.query.order_id && router.query.orderId) {
            getUserOrderStatus(router.query.order_id, router.query.orderId).then()
            setCookie(null, 'orderId', router.query.orderId.toString())
            setCookie(null, 'order_id', router.query.order_id.toString())
        }
    }, [])

    /*---- Form Validation ----*/

    return (
        <>
            <ModalComponent isOpen={isOpen} text={text} callBack={() => setIsOpen(false)} error={error}
                            link={'/account'} user={user} linkText={linkText} hasError={true}/>
            <Tabs>
                <TabList className={TabStyle.TabList}>
                    <Tab selectedClassName={TabStyle.Selected}><TabButtons text={t('common:reserve')}/></Tab>
                    <Tab selectedClassName={TabStyle.Selected} disabled={tabDisabled}
                         onClick={tabDisabled ? (e) => homeCallAlert(e, true) : null}>
                        <TabButtons text={t('common:home_call')}/>
                        <HomeCallCloudText callback={(e) => homeCallAlert(e, false)} style={homeCloudStyle}/>
                    </Tab>
                </TabList>
                <TabPanel>
                    <div className={CheckoutStyle.Form}>
                        <RequiredFields errors={errorsReserve}/>
                        <form
                            onSubmit={handleSubmitReserve((reserveData) => handleSubmitReserveOrders(reserveData))}>
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
                                rules={{required: true}}
                                render={({field: {onChange, value, ref}}) => (
                                    <SelectBox
                                        styles={customStyle}
                                        inputRef={ref}
                                        inputId={'checkoutBranch'}
                                        isSearchable={false}
                                        value={value}
                                        onChange={onChange}
                                        options={addresses}
                                        placeholder={<span
                                            style={{color: '#b0b8c0'}}>{t('common:select_branch')}</span>}
                                        components={{
                                            IndicatorSeparator: () => null,
                                        }}
                                    />
                                )}
                            />
                            <div className={CheckoutStyle.DatePicker}>
                                <div className={'row'}>
                                    <div className={'col-lg-6'}>
                                        <div
                                            className={errorsReserve.reserveDate ? CheckoutStyle.Date + ' ' + CheckoutStyle.DateWithError : CheckoutStyle.Date}>
                                            <Controller
                                                control={controlReserve}
                                                name="reserveDate"
                                                rules={{required: true}}
                                                render={({field: {onChange, value}}) => {
                                                    useEffect(() => {
                                                        setSelectedDate(value)
                                                    }, [value])
                                                    return <DatePicker
                                                        selected={value}
                                                        selectedDate={value}
                                                        onChange={onChange}
                                                        filterDate={isWeekday}
                                                        dateFormat='dd/MM/yyyy'
                                                        placeholderText={reserveOrderDate}
                                                        style={{
                                                            width: "100%",
                                                            borderColor: errorsReserve.reserveDate ? '#ff0000' : 'transparent'
                                                        }}
                                                        withPortal
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        yearDropdownItemNumber={100}
                                                        minDate={new Date()}
                                                    />
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={'col-lg-6' + ' ' + CheckoutStyle.Portal}>
                                        <div
                                            className={errorsReserve.reserveTime ? CheckoutStyle.Time + ' ' + CheckoutStyle.TimeWithError : CheckoutStyle.Time}>
                                            <Controller
                                                control={controlReserve}
                                                name="reserveTime"
                                                rules={{required: true}}
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
                                                        timeCaption={t('common:time')}
                                                        dateFormat="HH:mm"
                                                        includeTimes={availableTimes}
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
                            <div className={CheckoutStyle.PaymentMethodSwitcher}>
                                <label htmlFor="cod" className="form-check-label">
                                    {t('common:cash_on_deliver')}
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name='payment_method'
                                        id={'cod'}
                                        value={'cod'}
                                        onChange={(e) => handlePaymentMethod(e)}
                                        required={true}
                                    />
                                </label>
                                <label htmlFor="acba_gateway" className="form-check-label">
                                    {t('common:pay_online')}
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name='payment_method'
                                        id={'acba_gateway'}
                                        value={'acba_gateway'}
                                        onChange={(e) => handlePaymentMethod(e)}
                                        required={true}
                                    />
                                </label>
                            </div>
                            <Button
                                backgroundColor={backgroundColor}
                                text={t('common:reserve')}
                                type={'submit'}
                                disabled={!orders || orders.length === 0}
                            />
                        </form>
                        <div className={CheckoutStyle.Price}>
                            <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.Total}>
                                <p>{t('common:total')}</p>
                                <strong>{totalPrice}
                                    {
                                        loc === 'hy' ? <span className={'_icon-amd'}></span> :
                                            <span className='amd'>{t('common:amd')}</span>
                                    }
                                </strong>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={CheckoutStyle.Form}>
                        <RequiredFields errors={errorsHomeCall}/>
                        <form
                            onSubmit={handleSubmitHomeCall((homeCallData) => handleSubmitHomeCallOrders(homeCallData))}>
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
                                        <div
                                            className={errorsHomeCall.homeCallDate ? CheckoutStyle.Date + ' ' + CheckoutStyle.DateWithError : CheckoutStyle.Date}>
                                            <Controller
                                                control={controlHomeCall}
                                                name="homeCallDate"
                                                rules={{required: true}}
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
                                        <div
                                            className={errorsHomeCall.homeCallTime ? CheckoutStyle.Time + ' ' + CheckoutStyle.TimeWithError : CheckoutStyle.Time}>
                                            <Controller
                                                control={controlHomeCall}
                                                name="homeCallTime"
                                                rules={{required: true}}
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
                                                        timeCaption={t('common:time')}
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
                                placeholder={defaultCity}
                                type="text"
                                disabled={true}
                                name="homeCallCity"
                                {...registerHomeCall('homeCallCity')}
                                style={{borderColor: errorsHomeCall.homeCallCity ? '#ff0000' : 'transparent'}}
                                className={CheckoutStyle.CityValue}
                            />
                            <input
                                placeholder={defaultCountry}
                                type="text"
                                disabled={true}
                                name="homeCallCountry"
                                {...registerHomeCall('homeCallCountry')}
                                style={{borderColor: errorsHomeCall.homeCallCountry ? '#ff0000' : 'transparent'}}
                                className={CheckoutStyle.CountryValue}
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
                            <div className={CheckoutStyle.PaymentMethodSwitcher}>
                                <label htmlFor="cod" className="form-check-label">
                                    {t('common:cash_on_deliver')}
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name='payment_method'
                                        id={'cod'}
                                        value={'cod'}
                                        onChange={(e) => handlePaymentMethod(e)}
                                        required={true}
                                    />
                                </label>
                                <label htmlFor="acba_gateway" className="form-check-label">
                                    {t('common:pay_online')}
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name='payment_method'
                                        id={'acba_gateway'}
                                        value={'acba_gateway'}
                                        onChange={(e) => handlePaymentMethod(e)}
                                        required={true}
                                    />
                                </label>
                            </div>
                            <Button backgroundColor={backgroundColor} text={t('common:submit_order')} type={'submit'}
                                    disabled={!orders || orders.length === 0}/>
                        </form>
                        <div className={CheckoutStyle.Price}>
                            <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.CallHomePrice}>
                                <p>{t('common:home_call_price')}</p>
                                <strong>{homeCallPrice}
                                    {
                                        loc === 'hy' ? <span className={'_icon-amd'}></span> :
                                            <span className='amd'>{t('common:amd')}</span>
                                    }
                                </strong>
                            </div>
                            <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.Total}>
                                <p>{t('common:total')}</p>
                                <strong>{totalHomeCallPrice}
                                    {
                                        loc === 'hy' ? <span className={'_icon-amd'}></span> :
                                            <span className='amd'>{t('common:amd')}</span>
                                    }
                                </strong>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </>
    );
};

export function getStaticProps() {
    resetIdCounter();

    return {
        props: {}
    }
}


export default CheckoutForm;
