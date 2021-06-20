import React, {useState} from 'react';
import CUWSStyle from './contactUsInfoWithSelect.module.scss'
import BuildingIcon from "../../SVGIcons/Building/BuildingIcon";
import PhoneIcon from "../../SVGIcons/Phone/PhoneIcon";
import EmailIcon from "../../SVGIcons/Email/EmailIcon";
import SelectBox from "../../SelectBox/SelectBox";
import useTranslation from "next-translate/useTranslation";

const ContactInfoWithSelect = ({contactInfo}) => {

    const {t} = useTranslation()
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
        container: (provided) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            backgroundColor: "",
            "@media only screen and (max-width: 991px)": {
                ...provided["@media only screen and (max-width: 991px)"],
                marginLeft: '30px',
                width: '100%',
                maxHeight: '52px',
                marginBottom: '0',
                fontSize: '14px'
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused && "#F5FAFF",
            color: "#183042",
            fontSize: "16px",
            "@media only screen and (max-width: 991px)": {
                ...provided["@media only screen and (max-width: 991px)"],
                fontSize: '14px'
            },
        })
    }


    return (
        <div className={CUWSStyle.InfoBlock}>
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
                                <strong>{t('common:phone_short')}: <span className={CUWSStyle.InfoText}>{phone}</span></strong>
                            </div>
                        </div>
                    </div>
                    <div className={'col-lg-4'}>
                        <div className={CUWSStyle.Item}>
                            <div className={CUWSStyle.Image}>
                                <EmailIcon/>
                            </div>
                            <div className={CUWSStyle.Info}>
                                <strong>{t('common:email')}: <span className={CUWSStyle.InfoText}>{email}</span></strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default ContactInfoWithSelect;