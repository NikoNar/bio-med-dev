import React, {useState} from 'react';
import HeaderStyle from "../../Header/header.module.scss";
import SelectBox from "../../SelectBox/SelectBox";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";

const LanguageSwitcher = () => {

    const router = useRouter()
    const {locale} = router

    const [ cookie, setCookie ] = useCookies(['NEXT_LOCALE']);

    const styles = {
        control: (provided) => ({
            ...provided,
            boxShadow: "none",
            border: "none",
            backgroundColor: "#F5FAFF"
        }),
        container: (provided, state) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            width: '80px'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused && "#F5FAFF",
            color: "#183042",
            fontSize: "16px"
        })
    }


    const LanguageSwitcherOptions = [
        {value: 'hy', label: 'Հայ'},
        {value: 'ru', label: 'Рус'},
        {value: 'en', label: 'Eng'}
    ]
    const [selectedValue, setSelectedValue] = useState(locale);

    const handleChange = (e) => {
        const locale = e.value;
        setSelectedValue(locale);
        router.push(router.asPath, router.asPath, { locale }).then();
        if(cookie.NEXT_LOCALE !== locale){
            setCookie("NEXT_LOCALE", locale);
        }
    }



    return (
        <div className={HeaderStyle.LanguageSwitcher + ' ' + HeaderStyle.Item}>
            <SelectBox
                options={LanguageSwitcherOptions}
                value={LanguageSwitcherOptions.find(obj => obj.value === selectedValue)}
                defaultValue={locale}
                id={2}
                inputId={router.asPath}
                components={{
                    IndicatorSeparator: () => null,
                }}
                styles={styles}
                isSearchable={false}
                onChange={handleChange}
            />
        </div>
    );
};

export default LanguageSwitcher;