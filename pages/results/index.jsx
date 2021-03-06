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
        userFullName: Yup.string().required().matches(/^([^1-9]*)$/),
        userBirthDay: Yup.string(),
        userKey: Yup.string().required()
    })

    const [results, setResults] = useState(null)
    const [error, setError] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [link, setLink] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
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
        setDisabled(true)
        setIsLoading(true)
        await fetch(`${resultsUrl}?code=${resultsData.userKey}&surname=${resultsData.userFullName}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(async (data) => {
                    data.status && data.status.toString() === '404' && setError(t('common:error-404'))
                    data.status && data.status.toString() === '403' && setError(t('common:error-403'))
                    data.status && data.status.toString() === '416' && setError(t('common:error-416'))
                    data.status && data.status.toString() === '200' ? setIsOpen(false) : setIsOpen(true)
                    data.status.toString() === '200' && await fetch(`${resultsPdfUrl}?code=${resultsData.userKey}&surname=${resultsData.userFullName}`)
                        .then(res => res.json())
                        .then(data => {
                            setLink(data.url)
                        })
                    setResults(data.testList)
                    setDisabled(false)
                    setIsLoading(false)
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
                                {!results ? <small>{t('common:results_text')}</small> : null}
                            </div>
                        </div>
                        <div className={'col-lg-4'}>
                            <div className={ResStyle.PdfIcon}>
                                {
                                    link ? <a href={link} download={'Analyse results'} target='_blank' data-toggle="tooltip">
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
                                                        placeholder={t('common:sure_name')}
                                                        name="userFullName"
                                                        {...resultsRegister("userFullName")}
                                                        style={{borderColor: errors.userFullName ? '#ff0000' : 'transparent'}}
                                                    />
                                                </div>
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
                                                    <Button type={'submit'} text={isLoading ? '' : t('common:see_results')}
                                                            padding={'10px'}
                                                            isLoading={isLoading}
                                                            disabled={disabled}
                                                    />
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
