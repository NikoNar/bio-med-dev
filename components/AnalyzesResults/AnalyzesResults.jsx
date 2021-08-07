import React, {useState} from 'react';
import AnalyzesResultsItem from "./AnalyzesResultsItem/AnalyzesResultsItem";
import useTranslation from "next-translate/useTranslation";


const AnalyzesResults = ({results}) => {
    const {t} = useTranslation()
    var resData = Object.keys(results).map(key => {
        return results[key];
    })

    const resultNewArray = resData.map(res=>{
        if (!res.complexDetail){
            return {
                id: res.ID_test,
                number: res.ID_test,
                title: res.name,
                table: {
                    head: [
                        t('common:res_code'),
                        t('common:res_name'),
                        t('common:res_value'),
                        t('common:res_norma'),
                        t('common:res_unit')
                    ],
                    body: [
                        res.code,
                        res.name,
                        res.result,
                        res.norma,
                        res.unit
                    ]
                }
            }
        }
        else{
            var resComplexData = Object.keys(res.complexDetail).map(key => {
                return res.complexDetail[key];
            })
            return {
                id: res.ID_test,
                number: res.ID_test,
                title: res.name,
                table: {
                    head: [
                        t('common:res_code'),
                        t('common:res_name'),
                        t('common:res_value'),
                        t('common:res_norma'),
                        t('common:res_unit')
                    ],
                    body: [
                        res.code,
                        res.name,
                        res.result,
                        res.norma,
                        res.unit
                    ]
                },
                complexDetail: resComplexData.map((complex=>{
                    return{
                        id: complex.ID_test,
                        number: complex.ID_test,
                        title: complex.name,
                        table: {
                            head: [
                                "№",
                                t('common:res_name'),
                                t('common:res_value'),
                                t('common:res_norma'),
                                t('common:res_unit')
                            ],
                            body: [
                                complex.ID_test,
                                complex.name,
                                complex.result,
                                complex.norma,
                                complex.unit
                            ]
                        },
                    }
                }))
            }
        }
    })

    const [openAccordion, setOpenAccordion] = useState(false)
    const handleOpen = (index)=>{
        if (openAccordion === index){
            return setOpenAccordion(null)
        }
        setOpenAccordion(index)
    }


    return (
        <>
            <div className={'row pt-5'}>
                <div className={'col-lg-12'}>
                    {
                        resultNewArray ? resultNewArray.map((res, index)=>{
                            return (
                                <AnalyzesResultsItem callBack={() => handleOpen(index)}
                                                     openAccordion={openAccordion}
                                                     index={index} key={res.id} res={res}/>
                            )
                        }) : ''
                    }
                </div>
            </div>
        </>
    );
};




export default AnalyzesResults;
