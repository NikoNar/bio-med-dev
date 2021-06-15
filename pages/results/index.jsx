import React, {useState} from 'react';
import ResStyle from './results.module.scss'
import ContactUs from "../../components/ContactUs/ContactUs";
import {contactInfoUrl, resultsUrl} from "../../utils/url";
import Button from "../../components/Button/Button";
import * as Yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import RegisterFormStyle from "../../components/AccountForms/RegisterForm/register-form.module.scss";
import DatePicker from "react-datepicker";
import useTranslation from "next-translate/useTranslation";
import AnalyzesResults from "../../components/AnalyzesResults/AnalyzesResults";




const Results = ({contactInfo}) => {
    const {t} = useTranslation()

    const resultsSchema = Yup.object().shape({
        userFullName: Yup.string().matches(/^([^1-9]*)$/, t('errors:name_format_error')).required(t('errors:enter_email')),
        userBirthDay: Yup.string().required(t('errors:birthday_error')),
        userKey: Yup.string().required(t('errors:analyze_number_error'))
    })

    const [results, setResults] = useState(null)


    const {
        handleSubmit: handleResultsSubmit,
        register: resultsRegister,
        control: resultsControl,
        formState: {errors},
        reset: resultsFormReset
    } = useForm(
        {
            mode: 'onBlur',
            resolver: yupResolver(resultsSchema)
        }
    );


    const submitResultsForm = async (resultsData) => {

        await fetch(resultsUrl + `?number=${resultsData.userKey}&${resultsData.userFullName}&${resultsData.userBirthDay}`, {
            method: 'GET'
        })
            .then(res=>res.json())
            .then(data=>setResults(data))
            .then(()=>resultsFormReset({}))
    }

    return (
        <>
            <section className={ResStyle.Results}>
                <div className={'container' + ' ' + ResStyle.Info}>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            <div className={ResStyle.Title}>
                                <h4>{t('common:analyzes_results')}</h4>
                                <small>{t('common:analyzes_results_text')}</small>
                            </div>
                        </div>
                    </div>
                    <div className={'row mt-4'}>
                        <div className={'col-lg-12'}>
                            {
                                !results ?
                                    <div className={ResStyle.Form}>
                                        <form onSubmit={handleResultsSubmit(submitResultsForm)} >
                                        <div className={'row'}>
                                            <div className={'col-lg-4'}>
                                                <input
                                                    type="text"
                                                    placeholder={t('common:full_name')}
                                                    name="userFullName"
                                                    {...resultsRegister("userFullName")}
                                                />
                                                {errors.userFullName &&
                                                <div className={'error'}>
                                                    <p style={{color: '#ff0000'}}>
                                                        {errors.userFullName.message}
                                                    </p>
                                                </div>
                                                }
                                            </div>
                                            <div className={'col-lg-4'}>
                                                <Controller
                                                    control={resultsControl}
                                                    name="userBirthDay"
                                                    render={({field: {onChange, value}}) => (
                                                        <div className={RegisterFormStyle.DatePicker}>
                                                            <DatePicker
                                                                selected={value}
                                                                onChange={onChange}
                                                                dateFormat='dd/MM/yyyy'
                                                                placeholderText={t('common:birth_date')}
                                                                style={{width: "100%"}}
                                                                withPortal
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                yearDropdownItemNumber={100}
                                                                maxDate={new Date()}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                                {errors.userBirthDay &&
                                                <div className={'error'}>
                                                    <p style={{color: '#ff0000'}}>
                                                        {errors.userBirthDay.message}
                                                    </p>
                                                </div>
                                                }
                                            </div>
                                            <div className={'col-lg-4'}>
                                                <input
                                                    type="text"
                                                    placeholder={t('common:code')}
                                                    name="userKey"
                                                    {...resultsRegister("userKey")}
                                                />
                                                {errors.userKey &&
                                                <div className={'error'}>
                                                    <p style={{color: '#ff0000'}}>
                                                        {errors.userKey.message}
                                                    </p>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                        <div className={'row mt-3 mt-lg-5'}>
                                            <div className={'col-lg-12 text-end text-lg-start'}>
                                                <Button type={'submit'} text={t('common:see_results')}/>
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                    :
                                    <div className={'row'}>
                                        <div className={'col-lg-12'}>
                                            <div className={ResStyle.FullName}>
                                                <div className={'row'}>
                                                    <div className={'col-lg-12'}>
                                                        <div className={ResStyle.Header}>
                                                            <div className={ResStyle.Name}>
                                                                <span className="_icon-male"></span>
                                                                <h4>{results[0].fullName}</h4>
                                                            </div>
                                                            <div className={ResStyle.BirthDay}>
                                                                <h4>{new Date(results[0].date).toLocaleDateString()}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={'row'}>
                                                    <div className={'col-lg-12'}>
                                                        <AnalyzesResults results={results}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <ContactUs contactInfo={contactInfo}/>
        </>
    );
};


export async function getStaticProps(ctx) {
    const contactInfo = await fetch(contactInfoUrl, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            contactInfo
        },
    }
}

export default Results;