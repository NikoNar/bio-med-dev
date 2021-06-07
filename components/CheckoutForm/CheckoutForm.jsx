import React, {useState} from 'react';
import CheckoutStyle from './checkout.module.scss'
import SelectBox from "../SelectBox/SelectBox";
import Button from "../Button/Button";
import DatePicker from 'react-datepicker'
import {resetIdCounter, Tab, TabList, TabPanel} from "react-tabs";
import TabStyle from "../Tab/tab.module.scss";
import TabButtons from "../TabButtons/TabButtons";
import {orderUrl} from "../../utils/url";
import dynamic from "next/dynamic";
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false })


const CheckoutForm = ({info, orders}) => {

    /*--- Form data ---*/

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [branchAddress, setBranchAddress] = useState(info.contactInfo[0].label)
    const [orderDate, setOrderDate] = useState(new Date())
    const [orderTime, setOrderTime] = useState(new Date().getTime())


    const data = {
        fullName: fullName,
        email: email,
        phone: phone,
        branchAddress: branchAddress,
        orderDate:orderDate,
        orderTime: orderTime,
        order: orders
    }


    const handleSubmitOrders = async (e)=>{
        e.preventDefault()
        await fetch(orderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify(data)
        })
            .then(res=>res.json())
            .then(()=>{
                e.target.reset();
            })
    }





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

    const handleChange = (e) => {
        setBranchAddress(e.label);
    }

    const handleNameValue = (e)=>{
        setFullName(e.target.value)
    }

    const handlePhoneValue = (e)=>{
        setPhone(e.target.value)
    }

    const handleEmailValue = (e)=>{
        setEmail(e.target.value)
    }



    return (
        <Tabs>
            <TabList className={TabStyle.TabList}>
                <Tab selectedClassName={TabStyle.Selected}><TabButtons text={'ԱՄՐԱԳՐԵԼ'}/></Tab>
                <Tab selectedClassName={TabStyle.Selected}><TabButtons text={'ԿԱՆՉ ՏՈՒՆ'}/></Tab>
            </TabList>

            <TabPanel>
                <div className={CheckoutStyle.Form}>
                    <form onSubmit={(e)=>handleSubmitOrders(e)}>
                        <input placeholder="Անուն Ազգանուն*" type="text" onChange={(e)=>handleNameValue(e)} value={fullName}/>
                        <SelectBox
                            styles={styles}
                            options={info.contactInfo}
                            value={info.contactInfo.find(obj => obj.label === branchAddress)}
                            defaultValue={info.contactInfo[0]}
                            inputId={CheckoutStyle.CheckoutSelect}
                            isSearchable={false}
                            onChange={handleChange}
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                        />
                        <div className={CheckoutStyle.DatePicker}>
                            <div className={'row'}>
                                <div className={'col-lg-6'}>
                                    <DatePicker
                                        selected={orderDate}
                                        onChange={orderDate=>setOrderDate(orderDate)}
                                        dateFormat='dd/MM/yyyy'
                                        placeholderText={orderDate}
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
                                        selected={orderTime}
                                        onChange={(orderTime) => setOrderTime(orderTime)}
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
                        <input placeholder="Հեռախոսի համար*" type="tel" onChange={(e)=>handlePhoneValue(e)} value={phone}/>
                        <input placeholder="էլ հասցե*" type="email" onChange={(e)=>handleEmailValue(e)} value={email}/>
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
                    <form onSubmit={(e)=>handleSubmitOrders(e)}>
                        <input placeholder="Անուն Ազգանուն*" type="text" onChange={(e)=>handleNameValue(e)} value={fullName}/>
                        <div className={CheckoutStyle.DatePicker}>
                            <div className={'row'}>
                                <div className={'col-lg-6'}>
                                    <DatePicker
                                        selected={orderDate}
                                        onChange={orderDate=>setOrderDate(orderDate)}
                                        dateFormat='dd/MM/yyyy'
                                        placeholderText={orderDate}
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
                                        selected={orderTime}
                                        onChange={(orderTime) => setOrderTime(orderTime)}
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
                        <input placeholder="Հեռախոսի համար*" type="tel" onChange={(e)=>handlePhoneValue(e)} value={phone}/>
                        <input placeholder="էլ հասցե*" type="email" onChange={(e)=>handleEmailValue(e)} value={email}/>
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