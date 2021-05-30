import React, {forwardRef, useState} from 'react';
import RegisterFormStyle from './register-form.module.scss'
import Button from "../../Button/Button";
import DatePicker from 'react-datepicker'





const RegisterForm = () => {

    const [date, setDate] = useState(null)

    console.log(date);

    return (
           <div className={RegisterFormStyle.Register}>
               <form action="">
                   <div className={RegisterFormStyle.FullName}>
                       <input placeholder="Անուն Ազգանուն*" type="text" required/>
                       <span className="_icon-male active" data-type="male"></span>
                       <span className="_icon-female" data-type="female"></span>
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
                   <input placeholder="էլ հասցե*" type="email" required/>
                   <input placeholder="հեռախոսի համար*" type="tel" required/>
                   <input placeholder="Գաղտնաբառ*" type="password" required/>
                   <input placeholder="Գաղտնաբառի կրկնողություն" type="password" required/>
                   <Button type={'submit'} text={'ՈՒղարկել'}/>
               </form>
           </div>
    );
};

export default RegisterForm;