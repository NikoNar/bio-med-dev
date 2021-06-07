import React, {useState} from 'react';
import CheckoutStyle from './checkout.module.scss'
import SelectBox from "../SelectBox/SelectBox";
import Button from "../Button/Button";
import DatePicker from 'react-datepicker'
import {resetIdCounter, Tab, TabList, TabPanel} from "react-tabs";
import TabStyle from "../Tab/tab.module.scss";
import TabButtons from "../TabButtons/TabButtons";
import {homeCallOrdersUrl, orderUrl} from "../../utils/url";
import dynamic from "next/dynamic";
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false })
import { useForm, Controller } from "react-hook-form";



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

    const { register, handleSubmit, formState: { errors }, control } = useForm();

    /*--- Reserve Form data ---*/
    const reserveOrderDate = new Date().toLocaleDateString()
    const reserveOrderTime = new Date().toLocaleTimeString().slice(0,4)

   /* const reserveData = {
        fullName: reserveFullName,
        email: reserveEmail,
        phone: reservePhone,
        branchAddress: reserveBranchAddress,
        orderDate:reserveOrderDate,
        orderTime: reserveOrderTime,
        order: orders
    }*/

    console.log(reserveOrderDate);

    const handleSubmitReserveOrders = async (data)=>{
        console.log({...data, orders:orders});
        await fetch(orderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify({...data, orders:orders})
        })
            .then(res=>res.json())
    }

    /* ---- Home Call Form ----*/
    const [homeCallFullName, setHomeCallFullName] = useState('')
    const [homeCallEmail, setHomeCallEmail] = useState('')
    const [homeCallPhone, setHomeCallPhone] = useState('')
    const [homeCallOrderDate, setHomeCallOrderDate] = useState(new Date())
    const [homeCallOrderTime, setHomeCallOrderTime] = useState(new Date().getTime())

    const handleHomeCallNameValue = (e)=>{
        setHomeCallFullName(e.target.value)
    }

    const handleHomeCallEmailValue = (e)=>{
        setHomeCallEmail(e.target.value)
    }

    const handleHomeCallPhoneValue = (e)=>{
        setHomeCallPhone(e.target.value)
    }


    const handleSubmitHomeCallOrders = async (e, data)=>{

        //e.preventDefault()
        await fetch(homeCallOrdersUrl, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'credential': 'include'
            },
            body: JSON.stringify({...data, orders: orders})
        })
            .then(res=>res.json())
            .then(()=>{
                setHomeCallFullName('')
                setHomeCallEmail('')
                setHomeCallPhone('')
                setHomeCallOrderDate(new Date())
                setHomeCallOrderTime(new Date().getTime())
            })
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
                    <form onSubmit={handleSubmit((data)=>handleSubmitReserveOrders(data))}>
                        <input
                            placeholder="Անուն Ազգանուն*"
                            type="text"
                            name="fullName"
                            {...register('fullName', { required: true })}
                        />
                        { errors.fullName?.type === "required" && <p>Full Name is Required is required</p> }
                        <Controller
                            control={control}
                            defaultValue={info.contactInfo[0]}
                            name="branches"
                            render={({ field: { onChange, value, ref }}) => (
                                <SelectBox
                                    styles={styles}
                                    inputRef={ref}
                                    value={info.contactInfo.filter(c => value.label === c.label)}
                                    onChange={val => onChange(val)}
                                    options={info.contactInfo}
                                    components={{
                                        IndicatorSeparator: () => null,
                                    }}
                                />
                            )}
                        />
                        { errors.branches?.type === "required" && <p>Branch select is Required is required</p> }
                        <div className={CheckoutStyle.DatePicker}>
                            <div className={'row'}>
                                <div className={'col-lg-6'}>
                                    <Controller
                                        control={control}
                                        name="date"
                                        render={({ field: { onChange, value }}) => (
                                            <DatePicker
                                                selected={value}
                                                onChange={onChange}
                                                dateFormat='dd/MM/yyyy'
                                                placeholderText={reserveOrderDate}
                                                style={{ width: "100%" }}
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
                                        control={control}
                                        name="time"
                                        render={({ field: { onChange, value }}) => (
                                            <DatePicker
                                                style={{ width: "100%" }}
                                                selected={value}
                                                onChange={onChange}
                                                showTimeSelect
                                                placeholderText = {reserveOrderTime}
                                                withPortal
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Ժամը"
                                                dateFormat="HH:mm"
                                            />
                                        )}
                                    />
                                    {/*<DatePicker
                                        style={{ width: "100%" }}
                                        selected={value = reserveOrderTime}
                                        onChange={onChange}
                                        showTimeSelect
                                        withPortal
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Ժամը"
                                        dateFormat="HH:mm"
                                    />*/}
                                </div>
                            </div>
                        </div>
                        <input
                            placeholder="Հեռախոսի համար*"
                            type="tel"
                            //onChange={(e)=>handleReservePhoneValue(e)}
                            //value={reservePhone}
                            name="phoneNumber"
                            {...register('phoneNumber', { required: true, pattern: /^[\s()+-]*([0-9][\s()+-]*){6,20}$/ })}
                        />
                        { errors.phoneNumber?.type === "required" && <p>Phone Number is Required is required</p> }
                        <input
                            placeholder="էլ հասցե*"
                            type="email"
                            //onChange={(e)=>handleReserveEmailValue(e)}
                            //value={reserveEmail}
                            name="Email"
                            {...register('Email', { required: true })}
                        />
                        { errors.Email?.type === "required" && <p>Email is Required is required</p> }
                        <Button backgroundColor={backgroundColor} text={'ՀԱՍՏԱՏԵԼ ՊԱՏՎԵՐԸ'} type={'submit'}/>
                    </form>
                    <div className={CheckoutStyle.Price}>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.CallHomePrice}>
                            <p>Տնային այցի արժեքը</p>
                            <strong>5000 <span className={'_icon-amd'}> </span></strong>
                        </div>
                        <div className={CheckoutStyle.PriceItem + ' ' +CheckoutStyle.Total}>
                            <p>Ընդհանուր</p>
                            <strong>10000 <span className={'_icon-amd'}> </span></strong>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <div className={CheckoutStyle.Form}>
                    <form onSubmit={(e)=>handleSubmitHomeCallOrders(e)}>
                        <input placeholder="Անուն Ազգանուն*" type="text" onChange={(e)=>handleHomeCallNameValue(e)} value={homeCallFullName}/>
                        <div className={CheckoutStyle.DatePicker}>
                            <div className={'row'}>
                                <div className={'col-lg-6'}>
                                    <DatePicker
                                        selected={homeCallOrderDate}
                                        onChange={orderDate=>setHomeCallOrderDate(orderDate)}
                                        dateFormat='dd/MM/yyyy'
                                        placeholderText={homeCallOrderDate}
                                        style={{ width: "100%" }}
                                        withPortal
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        yearDropdownItemNumber={100}
                                    />
                                </div>
                                <div className={'col-lg-6' + ' ' + CheckoutStyle.Portal}>
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        selected={homeCallOrderTime}
                                        onChange={(orderTime) => setHomeCallOrderTime(orderTime)}
                                        showTimeSelect
                                        withPortal
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Ժամը"
                                        dateFormat="HH:mm"
                                    />
                                </div>
                            </div>
                        </div>
                        <input placeholder="Հեռախոսի համար*" type="tel" onChange={(e)=>handleHomeCallPhoneValue(e)} value={homeCallPhone}/>
                        <input placeholder="էլ հասցե*" type="email" onChange={(e)=>handleHomeCallEmailValue(e)} value={homeCallEmail}/>
                        <Button backgroundColor={backgroundColor} text={'ՀԱՍՏԱՏԵԼ ՊԱՏՎԵՐԸ'} type={'submit'}/>
                    </form>
                    <div className={CheckoutStyle.Price}>
                        <div className={CheckoutStyle.PriceItem + ' ' + CheckoutStyle.CallHomePrice}>
                            <p>Տնային այցի արժեքը</p>
                            <strong>5000 <span className={'_icon-amd'}> </span></strong>
                        </div>
                        <div className={CheckoutStyle.PriceItem + ' ' +CheckoutStyle.Total}>
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