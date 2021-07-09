import React, {useEffect, useState} from 'react';
import AnalyzesStyle from "../../pages/researches/Analyzes.module.scss";
import {Tab, TabList, TabPanel} from "react-tabs";
import TabStyle from "../Tab/tab.module.scss";
import TabButtons from "../TabButtons/TabButtons";
import AnalyzesCard from "../AnalyzesCard/AnalyzesCard";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import CloseIcon from "../SVGIcons/CloseIcon/CloseIcon";
import {analyzesCategoryUrl, analyzesUrl} from "../../utils/url";
import Pagination from "../Pagination/Pgination";

const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: true})


const AnalyzesList = ({categories, loc, allCategories, analyzes}) => {

    const {t} = useTranslation()
    const [allByFilterCategories, setAllByFilterCategories] = useState(allCategories)
    const [isOpen, setIsOpen] = useState(false)
    const [mainCategory, setMainCategory] = useState(categories[0].id)
    const [filterName, setFilterName] = useState(null)

    const [allAnalyzes, setAllAnalyzes] = useState(analyzes && analyzes)
    const [tabIndex, setTabIndex] = useState(0);


    useEffect(() => {
        setTabIndex(0)
        setAllAnalyzes(analyzes)
        setAllByFilterCategories(allCategories)
    }, [loc])

    const handleCategoryFilter = async (e) => {
        const value = e.target.value
        const name = e.target.id
        setFilterName(name)

        const filteredTest = await fetch(analyzesUrl +
            `?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&category=${value}&lang=${loc}`)
            .then(res=>res.json())
            .then(data=>data)
        setAllAnalyzes(filteredTest)
        setIsOpen(false)
    }

    const handleMainCategoryName = async (e) => {
        const tabName = e.target.getAttribute("data-value")
        setMainCategory(tabName)
        setFilterName(null)
        const tests = await fetch(analyzesCategoryUrl +
            `?lang=${loc}` +
            `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}` +
            `&parent=${tabName}`)
            .then(res=>res.json())
            .then(data=>data)

        const currentCategoryTests = await fetch(analyzesUrl +
            `?lang=${loc}` +
            `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`+
            `&category=${tabName}`)
            .then(res=>res.json())
            .then(data=>data)

        setAllAnalyzes(currentCategoryTests)
        setAllByFilterCategories(tests)
    }

    const handleClearFilters = async ()=>{
        setFilterName(null)
        const currentCategoryTests = await fetch(analyzesUrl +
            `?lang=${loc}` +
            `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`+
            `&category=${mainCategory}`)
            .then(res=>res.json())
            .then(data=>data)

        setAllAnalyzes(currentCategoryTests)
    }


    return (
        <section className={AnalyzesStyle.Main}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-lg-6 col-sm-12'}>
                        <h4>{t('common:researches')}</h4>
                    </div>
                </div>
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                    <TabList className={TabStyle.TabList}>
                        {
                            categories && categories.map((m) => {
                                return (
                                    <Tab selectedClassName={TabStyle.Selected} key={m.id}>
                                        <TabButtons
                                            text={m.name}
                                            dataName={m.id}
                                            callBack={(e) => handleMainCategoryName(e)}
                                        />
                                    </Tab>
                                )
                            })
                        }
                    </TabList>
                    <div className={'row'}>
                        <div className={'col-lg-12'}>
                            {
                                categories && categories.map((m) => {

                                    return (
                                        <TabPanel key={m.name}>
                                            <div className={'row'}>
                                                <div className={'col-lg-12'}>
                                                    <div className={AnalyzesStyle.Header}>
                                                        <div className={'row'}>
                                                            <div className={'col-lg-12'}>
                                                                <div className={AnalyzesStyle.Tags}>
                                                                    <ul className={isOpen ? AnalyzesStyle.Open : ''}>
                                                                        <span
                                                                            className={'_icon-chevrone-down'}
                                                                            onClick={()=>setIsOpen(!isOpen)}
                                                                            style={{display: allByFilterCategories && allByFilterCategories.length > 2 ? 'block' : 'none'}}
                                                                        > </span>
                                                                        <li className={AnalyzesStyle.Event}>
                                                                            <input
                                                                                id={m.main}
                                                                                type='radio'
                                                                                name={'events-1'}
                                                                                value='event'
                                                                                onChange={(e) => handleEventsFilter(e)}
                                                                            />
                                                                            <label htmlFor={'events-1'}>{t('common:event')}</label>
                                                                        </li>
                                                                        <li className={AnalyzesStyle.Emergency}>
                                                                            <input
                                                                                id={m.main}
                                                                                type="radio"
                                                                                name={'events-1'}
                                                                                value='homeCall'
                                                                                onChange={(e) => handleEventsFilter(e)}
                                                                            />
                                                                            <label htmlFor={'homeCall-1'}>{t('common:home_call')}</label>
                                                                        </li>
                                                                        {
                                                                            allByFilterCategories ? allByFilterCategories.map((item, index) => {
                                                                                return (
                                                                                    <li key={item.id}>
                                                                                        <input type="radio"
                                                                                               id={item.name}
                                                                                               name={item.parent}
                                                                                               value={item.id}
                                                                                               onChange={(e) => handleCategoryFilter(e)}
                                                                                        />
                                                                                        <label
                                                                                            htmlFor={item.name}>{item.name}</label>
                                                                                    </li>
                                                                                )
                                                                            }) : ''
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'col-lg-12'}>
                                                    <div className={AnalyzesStyle.SelectedFiltersName}>
                                                        <article>{t('common:selected_filter')}: <strong>{filterName ? filterName : t('common:no_filters_selected')}</strong></article>
                                                        {filterName ? <span><CloseIcon callBack={handleClearFilters}/></span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                allAnalyzes && allAnalyzes.length > 0 ? allAnalyzes.map((a, index) => {
                                                        return (
                                                            <div className={'row mb-5'} key={a.id}>
                                                                <div className={'col-lg-12'}>
                                                                    <div className={AnalyzesStyle.a}>
                                                                        <AnalyzesCard inner={a} index={index}
                                                                                      id={a.id}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }) :
                                                    <div className={AnalyzesStyle.NoMatch}>
                                                        <h4>{t('common:no_analysis_found_in_this_category')}</h4>
                                                    </div>
                                            }
                                            <Pagination/>
                                        </TabPanel>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Tabs>
            </div>
        </section>
    );
};

export default AnalyzesList;
