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
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: false})
import {useForm, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import HomeCallCloudText from "../Alerts/HomeCallCloudText/HomeCallCloudText";
import useTranslation from "next-translate/useTranslation";


const reserveSchema = Yup.object().shape({
    reserveFullName: Yup.string().matches(/^([^1-9]*)$/).required(),
    reserveDate: Yup.string().required(),
    reserveBranches: Yup.string().required().matches(/(?!^\d+$)^[\s\S]+$/, 'Please enter a valid description'),
    reserveEmail: Yup.string().email().required(),
    reservePhone: Yup.string().required(),
})





const CheckoutForm = ({info, orders}) => {


    const {
        handleSubmit: handleSubmitReserve,
        register: registerReserve,
        control: controlReserve,
        watch: registerWatch,
        formState: {errors},
        reset: reserveReset
    } = useForm(
        {
            mode: 'onBlur',
            resolver: yupResolver(reserveSchema)
        }
    );

    const {t} = useTranslation()
    const backgroundColor = 'linear-gradient(208deg,' + 'transparent 11px,' + '#52A4E3 0)'
    const styles = {
        control: (provided) => ({
            ...provided,
            boxShadow: "none",
            border: errors.reserveBranches ? "1px solid #ff0000" :"1px solid transparent",
            backgroundColor: "#f5faff",
            padding: 6
        }),
        container: (provided, state) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            backgroundColor: "",
            marginBottom: 30,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused && "#F5FAFF",
            color: "#183042",
            fontSize: "16px"
        })
    }

    /*Total Price Calculating*/

    const [totalPrice, setTotalPrice] = useState(0)
    const [tabDisabled, setTabDisabled] = useState(false)

    let calculateOrderItemsTotalPrice = '0'

    useEffect(() => {
        setTabDisabled(orders && orders.some((o)=>!o.callHome))

        calculateOrderItemsTotalPrice =  orders ? orders.reduce((acc, value)=>{
            return acc + (value.compare_price ? value.compare_price : value.price)
        }, 0) : 0
        setTotalPrice(calculateOrderItemsTotalPrice.toFixed(2));
    }, [orders])



/*    const {
        handleSubmit:handleSubmitHomeCall,
        control: controlHomeCall,
        reset: homeCallReset,
        register: registerHomeCall,
        formState:{errors: errors}
    } = useForm();*/


    /*--- Reserve Form data ---*/
    const reserveOrderDate = new Date().toLocaleDateString()
    const reserveOrderTime = new Date().toLocaleTimeString().slice(0, 4)




    const handleSubmitReserveOrders = async (reserveData) => {
        console.log(reserveData);
        await fetch(orderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify({...reserveData, orders: orders, totalPrice: calculateOrderItemsTotalPrice})
        })
            .then(res => {
                res.json()
                reserveReset({})
            })
            .then(data=>data)
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

    console.log(errors);


    const handleSubmitHomeCallOrders = async (homeCallData) => {

        await fetch(homeCallOrdersUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'credential': 'include'
            },
            body: JSON.stringify({...homeCallData, orders: orders, totalPrice: calculateOrderItemsTotalPrice})
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
                    <form onSubmit={handleSubmitReserve((reserveData) => handleSubmitReserveOrders(reserveData))}>
                        <input
                            placeholder={t('common:full_name')}
                            type="text"
                            name="reserveFullName"
                            {...registerReserve('reserveFullName', {required: 'Մուտքագրեք Ձեր անունը'})}
                            style={{borderColor: errors.reserveFullName ? '#ff0000' : 'transparent'}}
                        />
                        <Controller
                            control={controlReserve}
                            defaultValue={info.contactInfo[0]}
                            name="reserveBranches"
                            rules={{ required: true }}
                            render={({field: {onChange, value, ref}}) => (
                                <SelectBox
                                    styles={styles}
                                    inputRef={ref}
                                    inputId={CheckoutStyle.CheckoutSelect}
                                    isSearchable={false}
                                    onChange={val => onChange(val)}
                                    value={value}
                                    options={info.contactInfo}
                                    components={{
                                        IndicatorSeparator: () => null,
                                    }}
                                />
                            )}
                        />
                        <div className={
                            errors.reserveDate ? CheckoutStyle.DatePicker + ' ' + CheckoutStyle.DatePickerWithError : CheckoutStyle.DatePicker
                        }>
                            <div className={'row'}>
                                <div className={'col-lg-6'}>
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
                                <div className={'col-lg-6' + ' ' + CheckoutStyle.Portal}>
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
                        <input
                            placeholder={t('common:phone_number')}
                            type="tel"
                            name="reservePhone"
                            {...registerReserve('reservePhone', {required: true, pattern: /^[\s()+-]*([0-9][\s()+-]*){6,20}$/})}
                            style={{borderColor: errors.reservePhone ? '#ff0000' : 'transparent'}}
                        />

                        <input
                            placeholder={t('common:email')}
                            type="email"
                            name="reserveEmail"
                            {...registerReserve('reserveEmail', {required: true})}
                            style={{borderColor: errors.reserveEmail ? '#ff0000' : 'transparent'}}
                        />

                        <Button backgroundColor={backgroundColor} text={t('common:submit_order')} type={'submit'}/>
                    </form>
                    <div className={CheckoutStyle.Price}>
                       {/* <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.CallHomePrice}>
                            <p>Տնային այցի արժեքը</p>
                            <strong>5000 <span className={'_icon-amd'}> </span></strong>
                        </div>*/}
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.Total}>
                            <p>{t('common:total')}</p>
                            <strong>{totalPrice} <span className={'_icon-amd'}> </span></strong>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <div className={CheckoutStyle.Form}>
                    {/*<form onSubmit={handleSubmitHomeCall((homeCallData) => handleSubmitHomeCallOrders(homeCallData))}>
                        <input
                            placeholder={t('common:full_name')}
                            type="text"
                            name="homeCallFullName"
                            {...registerHomeCall('homeCallFullName', {required: 'Մուտքագրեք Ձեր անունը'})}
                        />
                        <ErrorMessage
                            errors={errorsHomeCall}
                            name="homeCallFullName"
                            render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>{message}</p></div>}
                        />
                        <div className={CheckoutStyle.DatePicker}>
                            <div className={'row'}>
                                <div className={'col-lg-6'}>
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
                                    <ErrorMessage
                                        errors={errorsHomeCall}
                                        name="homeCallDate"
                                        render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Please select date first</p></div>}
                                    />
                                </div>
                                <div className={'col-lg-6' + ' ' + CheckoutStyle.Portal}>
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
                                    <ErrorMessage
                                        errors={errorsHomeCall}
                                        name="homeCallTime"
                                        render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Please select time first</p></div>}
                                    />
                                </div>
                            </div>
                        </div>
                        <input
                            placeholder={t('common:phone_number')}
                            type="tel"
                            name="homeCallPhoneNumber"
                            {...registerHomeCall('homeCallPhoneNumber', {required: true, pattern: /^[\s()+-]*([0-9][\s()+-]*){6,20}$/})}
                        />
                        <ErrorMessage
                            errors={errorsHomeCall}
                            name="homeCallPhoneNumber"
                            render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Phone number is required</p></div>}
                        />
                        <input
                            placeholder={t('common:email')}
                            type="email"
                            name="homeCallEmail"
                            {...registerHomeCall('homeCallEmail', {required: true})}
                        />
                        <ErrorMessage
                            errors={errorsHomeCall}
                            name="homeCallEmail"
                            render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Email is required</p></div>}
                        />
                        <Button backgroundColor={backgroundColor} text={t('common:submit_order')} type={'submit'}/>
                    </form>*/}
                    <div className={CheckoutStyle.Price}>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.CallHomePrice}>
                            <p>{t('common:home_call_price')}</p>
                            <strong>5000 <span className={'_icon-amd'}> </span></strong>
                        </div>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.Total}>
                            <p>{t('common:total')}</p>
                            <strong>{totalPrice} <span className={'_icon-amd'}> </span></strong>
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