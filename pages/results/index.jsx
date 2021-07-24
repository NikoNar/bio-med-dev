import React, {useState, useEffect} from 'react';
import ResStyle from './results.module.scss'
import ContactUs from "../../components/ContactUs/ContactUs";
import {contactInfoUrl, locationsUrl, resultsPdfUrl, resultsUrl} from "../../utils/url";
import Button from "../../components/Button/Button";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useTranslation from "next-translate/useTranslation";
import AnalyzesResults from "../../components/AnalyzesResults/AnalyzesResults";
import RequiredFields from "../../components/Alerts/RequiredFields/RequiredFields";
import ModalComponent from "../../components/Alerts/Modal/ModalComponent";
import PdfIcon from "../../components/SVGIcons/Pdf/PdfIcon";


const Results = ({contactInfo, contactPageInfo}) => {
    const {t} = useTranslation()

    const resultsSchema = Yup.object().shape({
        userFullName: Yup.string().matches(/^([^1-9]*)$/),
        userBirthDay: Yup.string(),
        userKey: Yup.string()
    })

    const [results, setResults] = useState(null)
    const [error, setError] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [link, setLink] = useState('')
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


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);


    const closeModal = () => {
        setIsOpen(false)
    }

    const submitResultsForm = async (resultsData) => {
        await fetch(`${resultsUrl}?code=${resultsData.userKey}&surname=${resultsData.userFullName}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(async (data) => {
                    console.log(data.status);
                    data.status && data.status.toString() === '404' && setError('Ձեր մուտքագռած կոդը գոյություն չունի')
                    data.status && data.status.toString() === '403' && setError('Ձեր մուտքագռած ազգանունը սխալ է')
                    data.status && data.status.toString() === '416' && setError('Դուք ունեք չմարած պարտավորվածություն և չեք կարող կատարել հարցում')
                    data.status && data.status.toString() === '200' ? setIsOpen(false) : setIsOpen(true)
                    data.status.toString() === '200' && await fetch(`${resultsPdfUrl}?code=${resultsData.userKey}&surname=${resultsData.userFullName}`)
                        .then(res => res.json())
                        .then(data => {
                            setLink(data.url)
                        })
                    setResults(data.testList)
                }
            )
            .then(() => resultsFormReset({}))
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <>
            <ModalComponent callBack={closeModal} isOpen={error ? isOpen : false} error={error}/>
            <section className={ResStyle.Results}>
                <div className={'container' + ' ' + ResStyle.Info}>
                    <div className={'row'}>
                        <div className={'col-lg-8'}>
                            <div className={ResStyle.Title}>
                                <h4>{t('common:analyzes_results')}</h4>
                                <small>{t('common:analyzes_results_text')}</small>
                            </div>
                        </div>
                        <div className={'col-lg-4'}>
                            <div className={ResStyle.PdfIcon}>
                                {
                                    link ? <a href={link}>
                                        <PdfIcon/>
                                    </a> : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div className={'row mt-4'}>
                        <div className={'col-lg-12'}>
                            {
                                !results || results.length <= 0 ?
                                    <div className={ResStyle.Form}>
                                        <RequiredFields errors={errors}/>
                                        <form onSubmit={handleResultsSubmit(submitResultsForm)}>
                                            <div className={'row'}>
                                                <div className={'col-lg-4'}>
                                                    <input
                                                        type="text"
                                                        placeholder={t('common:full_name')}
                                                        name="userFullName"
                                                        {...resultsRegister("userFullName")}
                                                        style={{borderColor: errors.userFullName ? '#ff0000' : 'transparent'}}
                                                    />
                                                </div>
                                                {/*<div className={'col-lg-4'}>
                                                    <div
                                                        className={RegisterFormStyle.DatePicker + ' ' + ResStyle.DatePicker}>
                                                        <div
                                                            className={errors.userBirthDay ? ResStyle.Date + ' ' + ResStyle.DateWithError : ResStyle.Date}>
                                                            <Controller
                                                                control={resultsControl}
                                                                name="userBirthDay"
                                                                render={({field: {onChange, value}}) => (

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
                                                                )}
                                                            />
                                                        </div>
                                                        </div>
                                                </div>*/}
                                                <div className={'col-lg-4'}>
                                                    <input
                                                        type="text"
                                                        placeholder={t('common:code')}
                                                        name="userKey"
                                                        {...resultsRegister("userKey")}
                                                        style={{borderColor: errors.userKey ? '#ff0000' : 'transparent'}}
                                                    />
                                                </div>
                                            </div>
                                            <div className={'row mt-3 mt-lg-5'}>
                                                <div className={'col-lg-12 text-end text-lg-start'}>
                                                    <Button type={'submit'} text={t('common:see_results')}
                                                            padding={'10px'}/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    :
                                    <div className={'row'}>
                                        <div className={'col-lg-12'}>
                                            <div className={ResStyle.FullName}>
                                                {/*<div className={'row'}>*/}
                                                {/*    <div className={'col-lg-12'}>*/}
                                                {/*        <div className={ResStyle.Header}>*/}
                                                {/*            <div className={ResStyle.Name}>*/}
                                                {/*                <span className="_icon-male"></span>*/}
                                                {/*                <h4>{results && results[0].fullName}</h4>*/}
                                                {/*            </div>*/}
                                                {/*            <div className={ResStyle.BirthDay}>*/}
                                                {/*                <h4>{results && new Date(results[0].date).toLocaleDateString()}</h4>*/}
                                                {/*            </div>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
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
            <ContactUs contactInfo={contactInfo} t={t} contactPageInfo={contactPageInfo}/>
        </>
    );
};


export async function getServerSideProps(ctx) {
    const contactInfo = await fetch(`${locationsUrl}?status=publish&lang=${ctx.locale}`)
        .then(res => res.json())
        .then(data => data)

    const contactPageInfo = await fetch(contactInfoUrl + `&lang=${ctx.locale}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => data)

    return {
        props: {
            contactInfo,
            contactPageInfo
        },
    }
}

export default Results;
