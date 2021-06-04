import React, {useState} from 'react';
import RegisterFormStyle from './register-form.module.scss'
import Button from "../../Button/Button";
import DatePicker from 'react-datepicker'
import {registerUrl} from "../../../utils/url";






const RegisterForm = ({security}) => {

    const [date, setDate] = useState(null)
    const [fullName, setFullName] = useState('')
    const [gender, setGender] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [repeatPassword, setRepeatPassword] = useState()


    const handleNameValue = (e)=>{
        setFullName(e.target.value)
    }

    const handleGenderValue = (e)=>{
        setGender(e.target.value)
    }

    const handleEmailValue = (e)=>{
        setEmail(e.target.value)
    }

    const handlePhoneValue = (e)=>{
        setPhone(e.target.value)
    }

    const handlePasswordValue = (e)=>{
        setPassword(e.target.value)
    }

    const handleRepeatPasswordValue = (e)=>{
        setRepeatPassword(e.target.value)
    }

    const data = {
        fullName: fullName,
        gender: gender,
        date: date,
        email: email,
        phone: phone,
        password: password,
        repeatPassword: repeatPassword
    }


    const handleSubmit = async (e)=>{
        console.log('boom')
        e.preventDefault()
       await fetch(registerUrl, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
       })
           .then(res=>res.json())
           .then(()=>{
               e.target.reset();
               setDate(null)
           })
    }


    return (
           <div className={RegisterFormStyle.Register}>
               <form onSubmit={handleSubmit}>
                   <div className={RegisterFormStyle.FullName}>
                       <input placeholder="Անուն Ազգանուն*" type="text" onChange={(e)=>handleNameValue(e)}/>
                       <label htmlFor="male" className={RegisterFormStyle.MaleActive}>
                           <input type="radio" id="male" value='male' onChange={(e)=>handleGenderValue(e)}/>
                           <span className="_icon-male"></span>
                       </label>
                       <label htmlFor="female" className={RegisterFormStyle.FemaleActive}>
                           <input type="radio" id="female" value='female' onChange={(e)=>handleGenderValue(e)}/>
                           <span className="_icon-female"></span>
                       </label>
                   </div>
                   <div className={RegisterFormStyle.DatePicker}>
                       <DatePicker
                           selected={date}
                           onChange={date=>setDate(date)}
                           dateFormat='dd/MM/yyyy'
                           placeholderText={'Ծննդյան օր ամիս տարեթիվ'}
                           style={{ width: "100%" }}
                           withPortal
                           showMonthDropdown
                           showYearDropdown
                           dropdownMode="select"
                           yearDropdownItemNumber={100}
                           maxDate = {new Date()}
                       />
                   </div>
                   <input placeholder="էլ հասցե*" type="email" onChange={(e)=>handleEmailValue(e)}/>
                   <input placeholder="հեռախոսի համար*" type="tel" onChange={(e)=>handlePhoneValue(e)}/>
                   <h4 style={{display: security ? 'block' : 'none'}}>Անվտանգություն</h4>
                   <input placeholder="Ընթացիկ գաղտնաբառ" type="password"  style={{display: security ? 'block' : 'none'}}/>
                   <input placeholder="Գաղտնաբառ*" type="password" onChange={(e)=>handlePasswordValue(e)}/>
                   <input placeholder="Գաղտնաբառի կրկնողություն" type="password" onChange={(e)=>handleRepeatPasswordValue(e)}/>
                   <Button type={'submit'} text={'ՈՒղարկել'}/>
               </form>
           </div>
    );
};

export default RegisterForm;