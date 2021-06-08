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

const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: false})
import {useForm, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";


const CheckoutForm = ({info, orders}) => {

    const backgroundColor = 'linear-gradient(208deg,' + 'transparent 11px,' + '#52A4E3 0)'
    const styles = {
        control: (provided) => ({
            ...provided,
            boxShadow: "none",
            border: "none",
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


    const {
        handleSubmit: handleSubmitReserve,
        control: controlReserve,
        reset: reserveReset,
        register: registerReserve,
        formState:{errors: errorsReserve}
    }= useForm();

    const {
        handleSubmit:handleSubmitHomeCall,
        control: controlHomeCall,
        reset: homeCallReset,
        register: registerHomeCall,
        formState:{errors: errorsHomeCall}
    } = useForm();




    /*--- Reserve Form data ---*/
    const reserveOrderDate = new Date().toLocaleDateString()
    const reserveOrderTime = new Date().toLocaleTimeString().slice(0, 4)




    const handleSubmitReserveOrders = async (reserveData) => {

        await fetch(orderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify({...reserveData, orders: orders})
        })
            .then(res => {
                res.json()
                reserveReset({})
            })
            .then(data=>data)
    }

    /* ---- Home Call Form ----*/


    const handleSubmitHomeCallOrders = async (homeCallData) => {

        await fetch(homeCallOrdersUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'credential': 'include'
            },
            body: JSON.stringify({...homeCallData, orders: orders})
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
                <Tab selectedClassName={TabStyle.Selected}><TabButtons text={'ԱՄՐԱԳՐԵԼ'}/></Tab>
                <Tab selectedClassName={TabStyle.Selected}><TabButtons text={'ԿԱՆՉ ՏՈՒՆ'}/></Tab>
            </TabList>

            <TabPanel>
                <div className={CheckoutStyle.Form}>
                    <form onSubmit={handleSubmitReserve((reserveData) => handleSubmitReserveOrders(reserveData))}>
                        <input
                            placeholder="Անուն Ազգանուն*"
                            type="text"
                            name="reserveFullName"
                            {...registerReserve('reserveFullName', {required: 'Մուտքագրեք Ձեր անունը'})}
                        />
                        <ErrorMessage
                            errors={errorsReserve}
                            name="reserveFullName"
                            render={({message}) =>  <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Մուտքագրեք Ձեր անունը</p></div>}
                        />
                        <Controller
                            control={controlReserve}
                            defaultValue={info.contactInfo[0]}
                            name="branches"
                            rules={{ required: true }}
                            render={({field: {onChange, value, ref}}) => (
                                <SelectBox
                                    styles={styles}
                                    inputRef={ref}
                                    inputId={CheckoutStyle.CheckoutSelect}
                                    isSearchable={false}
                                    value={info.contactInfo.filter(c => value ? value.label : info.contactInfo[0].label === c.label)}
                                    onChange={val => onChange(val)}
                                    options={info.contactInfo}
                                    components={{
                                        IndicatorSeparator: () => null,
                                    }}
                                />
                            )}
                        />
                        <ErrorMessage
                            errors={errorsReserve}
                            name="branches"
                            render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Please select branch first</p></div>}
                        />
                        <div className={CheckoutStyle.DatePicker}>
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
                                    <ErrorMessage
                                        errors={errorsReserve}
                                        name="reserveDate"
                                        render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Please select date first</p></div>}
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
                                    <ErrorMessage
                                        errors={errorsReserve}
                                        name="reserveTime"
                                        render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Please select time first</p></div>}
                                    />
                                </div>
                            </div>
                        </div>
                        <input
                            placeholder="Հեռախոսի համար*"
                            type="tel"
                            name="reservePhoneNumber"
                            {...registerReserve('reservePhoneNumber', {required: true, pattern: /^[\s()+-]*([0-9][\s()+-]*){6,20}$/})}
                        />
                        <ErrorMessage
                            errors={errorsReserve}
                            name="reservePhoneNumber"
                            render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Phone number is required</p></div>}
                        />
                        <input
                            placeholder="էլ հասցե*"
                            type="email"
                            name="reserveEmail"
                            {...registerReserve('reserveEmail', {required: true})}
                        />
                        <ErrorMessage
                            errors={errorsReserve}
                            name="reserveEmail"
                            render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Email is required</p></div>}
                        />
                        <Button backgroundColor={backgroundColor} text={'ՀԱՍՏԱՏԵԼ ՊԱՏՎԵՐԸ'} type={'submit'}/>
                    </form>
                    <div className={CheckoutStyle.Price}>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.CallHomePrice}>
                            <p>Տնային այցի արժեքը</p>
                            <strong>5000 <span className={'_icon-amd'}> </span></strong>
                        </div>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.Total}>
                            <p>Ընդհանուր</p>
                            <strong>10000 <span className={'_icon-amd'}> </span></strong>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <div className={CheckoutStyle.Form}>
                    <form onSubmit={handleSubmitHomeCall((homeCallData) => handleSubmitHomeCallOrders(homeCallData))}>
                        <input
                            placeholder="Անուն Ազգանուն*"
                            type="text"
                            name="homeCallFullName"
                            {...registerHomeCall('homeCallFullName', {required: 'Մուտքագրեք Ձեր անունը'})}
                        />
                        <ErrorMessage
                            errors={errorsHomeCall}
                            name="homeCallFullName"
                            render={({message}) => <p style={{color: '#ff0000'}}>{message}</p>}
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
                            placeholder="Հեռախոսի համար*"
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
                            placeholder="էլ հասցե*"
                            type="email"
                            name="homeCallEmail"
                            {...registerHomeCall('homeCallEmail', {required: true})}
                        />
                        <ErrorMessage
                            errors={errorsHomeCall}
                            name="homeCallEmail"
                            render={({message}) => <div className={CheckoutStyle.Error}><p style={{color: '#ff0000'}}>Email is required</p></div>}
                        />
                        <Button backgroundColor={backgroundColor} text={'ՀԱՍՏԱՏԵԼ ՊԱՏՎԵՐԸ'} type={'submit'}/>
                    </form>
                    <div className={CheckoutStyle.Price}>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.CallHomePrice}>
                            <p>Տնային այցի արժեքը</p>
                            <strong>5000 <span className={'_icon-amd'}> </span></strong>
                        </div>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.Total}>
                            <p>Ընդհանուր</p>
                            <strong>10000 <span className={'_icon-amd'}> </span></strong>
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