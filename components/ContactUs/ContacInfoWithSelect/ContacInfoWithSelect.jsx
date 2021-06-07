import React, {useState} from 'react';
import CUWSStyle from './contactUsInfoWithSelect.module.scss'
import BuildingIcon from "../../SVGIcons/Building/BuildingIcon";
import PhoneIcon from "../../SVGIcons/Phone/PhoneIcon";
import EmailIcon from "../../SVGIcons/Email/EmailIcon";
import SelectBox from "../../SelectBox/SelectBox";

const ContactInfoWithSelect = ({contactInfo}) => {


    const Addresses = contactInfo
    const [selectedValue, setSelectedValue] = useState(Addresses[0].label);
    const [phone, setPhone] = useState(Addresses[0].tel)
    const [email, setEmail] = useState(Addresses[0].email)


    const handleChange = e => {
        
        setSelectedValue(e.label);
        setPhone(e.tel)
        setEmail(e.email)
    }

    const styles = {
        control: (provided) => ({
            ...provided,
            boxShadow: "none",
            border: "none",
            backgroundColor: "#FFFFFF",    
            padding: "6px"
        }),
        container: (provided, state) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            backgroundColor: ""
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused && "#F5FAFF",
            color: "#183042",
            fontSize: "16px"
        })
    }


    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-lg-4'}>
                    <div className={CUWSStyle.Item}>
                        <div className={CUWSStyle.Image}>
                            <BuildingIcon/>
                        </div>
                        <div className={CUWSStyle.Select}>
                            <SelectBox
                                options={Addresses}
                                value={Addresses.find(obj => obj.label === selectedValue)}
                                defaultValue={Addresses[0]}
                                id={1}
                                inputId={'contactInfo'}
                                components={{
                                    IndicatorSeparator: () => null,
                                }}
                                styles={styles}
                                isSearchable={false}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className={'col-lg-4'}>
                    <div className={CUWSStyle.Item}>
                        <div className={CUWSStyle.Image}>
                            <PhoneIcon/>
                        </div>
                        <div className={CUWSStyle.Info}>
                            <strong>Հեռ.: <span className={CUWSStyle.InfoText}>{phone}</span></strong>
                        </div>
                    </div>
                </div>
                <div className={'col-lg-4'}>
                    <div className={CUWSStyle.Item}>
                        <div className={CUWSStyle.Image}>
                            <EmailIcon/>
                        </div>
                        <div className={CUWSStyle.Info}>
                            <strong>Email.: <span className={CUWSStyle.InfoText}>{email}</span></strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default ContactInfoWithSelect;