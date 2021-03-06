import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import AnalyzesStyle from "../../pages/researches/Analyzes.module.scss";
import {Tab, TabList, TabPanel} from "react-tabs";
import TabStyle from "../Tab/tab.module.scss";
import TabButtons from "../TabButtons/TabButtons";
import AnalyzesCard from "../AnalyzesCard/AnalyzesCard";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import CloseIcon from "../SVGIcons/CloseIcon/CloseIcon";
import {analyzesCategoryUrl, analyzesUrl} from "../../utils/url";
import ALStyle from './analyzes-lst.module.scss'
import {useRouter} from "next/router";
import NextPrevPagination from "../Pagination/NextPrevPagination/NextPrevPagination";

const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), {ssr: true})


const AnalyzesList = ({categories, loc, allCategories, analyzes, totalPages, mainCategoryId}) => {
    const [page, setPage] = useState(1)
    const router = useRouter()
    const {t} = useTranslation()
    const [allByFilterCategories, setAllByFilterCategories] = useState(allCategories)
    const [isOpen, setIsOpen] = useState(false)
    const [mainCategory, setMainCategory] = useState(categories[0] && categories[0].id)
    const [filterName, setFilterName] = useState(null)
    const [active, setActive] = React.useState(null);
    const [allAnalyzes, setAllAnalyzes] = useState(analyzes && analyzes)
    const [tabIndex, setTabIndex] = useState(0);
    const [activeFilterId, setActiveFilterID] = useState()
    const [totalPagesCount, setTotalPagesCount] = useState()
    const [callHome, setCallHome] = useState(false)
    const [onSale, setOnSale] = useState(false)
    const ref = useRef(null)
    //const popular = allAnalyzes.filter((o) => o.tags.some(t => t.name === 'popular'))
    const [height, setHeight] = useState(null)

    useEffect(()=>{
        setMainCategory(categories[0] && categories[0].id)
    },[loc])

    useEffect(()=>{
        setTimeout(()=>{
            const current = ref.current
            setHeight(current.offsetHeight)
        },3000)
    },[mainCategory])


    useEffect(() => {
        setTabIndex(0)
        setPage(1)
        setAllAnalyzes(analyzes)
        setAllByFilterCategories(allCategories)
        setTotalPagesCount(totalPages)
    }, [loc])


    useEffect(()=>{
        if (router.pathname === '/call-home'){
            setCallHome(true)
            setOnSale(false)
            setFilterName(t('common:home_call'))
            fetchHomeCallProducts().then()
        }
    },[mainCategory, router, loc])


    async function fetchTestWithPage (page){
        await fetch(`${analyzesUrl}${loc !== 'hy' ? `?lang=${loc}&` : '?'}${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&page=${page}${callHome ? '&shipping_class=124' : onSale ? '&on_sale=true' : '' }&category=${!activeFilterId ? mainCategory : null},${activeFilterId}&order=asc`)
            .then(res=>res.json())
            .then(data=>{
                setAllAnalyzes(data)
            })
    }
    async function fetchProductsByCategory(page, value){
        const filteredTest = await fetch(analyzesUrl +
            `?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&category=${value}&${loc !== 'hy' ? `lang=${loc}` : ''}&page=${page}`)
            .then(res => {
                const total = res.headers.get('x-wp-totalpages')
                setTotalPagesCount(total)
                return res.json()
            })
            .then(data => data)
        setAllAnalyzes(filteredTest)
    }
    async function fetchMainCategoryTests(tabName, page){
        const tests = await fetch(analyzesCategoryUrl +
            `?${loc !== 'hy' ? `lang=${loc}` : ''}` +
            `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&order=asc` +
            `&parent=${tabName}&page=${page}&per_page=100`)
            .then(res => res.json())
            .then(data => data)
        if (!callHome){
            const currentCategoryTests = await fetch(analyzesUrl +
                `?${loc !== 'hy' ? `lang=${loc}` : ''}` +
                `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&order=asc` +
                `&category=${tabName}&page=${page}`)
                .then(res => {
                    const total = res.headers.get('x-wp-totalpages')
                    setTotalPagesCount(total)
                    return res.json()
                })
                .then(data => data)
            setAllAnalyzes(currentCategoryTests)
        }
        setAllByFilterCategories(tests)
    }
    async function fetchHomeCallProducts(){
       setActive(false)
        const filteredTest = await fetch(`${analyzesUrl}?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}${loc !== 'hy' ? `&lang=${loc}` : ''}&shipping_class=124&category=${mainCategory}&order=asc&page=${page}`)
            .then(res => {
                const total = res.headers.get('x-wp-totalpages')
                setTotalPagesCount(total)
                return res.json()
            })
            .then(data => data)
        setAllAnalyzes(filteredTest)
    }
    async function clearFilters(){
        const currentCategoryTests = await fetch(analyzesUrl +
            `?${loc !== 'hy' ? `lang=${loc}` : ''}` +
            `&${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}` +
            `&category=${mainCategory}&order=asc`)
            .then(res => {
                const total = res.headers.get('x-wp-totalpages')
                setTotalPagesCount(total)
                setActiveFilterID(null)
                return res.json()
            })
            .then(data => data)
        setCallHome(false)
        setOnSale(false)
        setAllAnalyzes(currentCategoryTests)
    }


    const handleCategoryFilter = async (e, index) => {
        setPage(1)
        setActive(index)
        const value = e.target.value
        const name = e.target.id
        setActiveFilterID(+value)
        setFilterName(name)
        setIsOpen(false)
        setCallHome(false)
        setOnSale(false)
        fetchProductsByCategory(1, value).then()
    }
    const handleMainCategoryName = (e, page = 1) => {
        setPage(1)
        setIsOpen(false)
        const tabName = e.target.getAttribute("data-value")
        setMainCategory(tabName)
        setFilterName(null)
        setActive(null)
        fetchMainCategoryTests(tabName, 1).then()
    }
    const handleClearFilters = () => {
        setPage(1)
        setFilterName(null)
        setActive(null)
        //setActive(null)
        clearFilters().then()
    }
    const handleSaleFilter = async () => {
        setCallHome(false)
        setOnSale(true)
        setActive(null)
        setFilterName(t('common:event'))
       /* if (!active){
            clearFilters().then()
        }*/
        const filteredTest = await fetch(analyzesUrl +
            `?${process.env.NEXT_PUBLIC_CONSUMER_KEY}&${process.env.NEXT_PUBLIC_CONSUMER_SECRET}&on_sale=true&${loc !== 'hy' ? `lang=${loc}` : ''}&category=${mainCategory}&order=asc`)
            .then(res => {
                const total = res.headers.get('x-wp-totalpages')
                setTotalPagesCount(total)
                return res.json()
            })
            .then(data => data)
        setAllAnalyzes(filteredTest)
        setIsOpen(false)
    }
    const handleHomeCallFilter = async () => {
        setActive(null)
        setCallHome(true)
        setOnSale(false)
        setPage(1)
        fetchHomeCallProducts().then()
        /*if (!active){
            clearFilters().then()
        }*/
        setFilterName(t('common:home_call'))
        setIsOpen(false)
    }
    const handlePrevPageAnalyzes =  ()=>{
        setPage(page - 1)
        fetchTestWithPage(page - 1).then()
    }
    const handleNextPageAnalyzes = ()=>{
        setPage(page + 1)
        fetchTestWithPage(page + 1).then()
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
                                    <Tab selectedClassName={TabStyle.Selected} key={m.id}   disabled={router.pathname === '/call-home'}>
                                        <TabButtons
                                            text={m.name}
                                            dataName={m.id}
                                            callBack={(e) => {
                                                if ( router.pathname !== '/call-home'){
                                                    handleMainCategoryName(e)
                                                }
                                            }}
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
                                                                <div className={isOpen ? AnalyzesStyle.Open + ' ' + AnalyzesStyle.Tags : AnalyzesStyle.Tags}>
                                                                    {height && height > 47 ? <span
                                                                        className={'_icon-chevrone-down'}
                                                                        onClick={() => setIsOpen(!isOpen)}
                                                                        > </span> : null }
                                                                    <ul ref={ref} className={'cat_list'}>
                                                                        <li className={AnalyzesStyle.Event}>
                                                                            <input
                                                                                id={'on_sale'}
                                                                                type='radio'
                                                                                name={mainCategory}
                                                                                checked={onSale}
                                                                                value='event'
                                                                                onChange={(e) => handleSaleFilter(e)}
                                                                            />
                                                                            <label
                                                                                htmlFor={'on_sale'}>{t('common:event')}</label>
                                                                        </li>
                                                                        <li className={AnalyzesStyle.Emergency}>
                                                                            <input
                                                                                id={'homeCall'}
                                                                                checked={callHome}
                                                                                type="radio"
                                                                                name={mainCategory}
                                                                                value='homeCall'
                                                                                onChange={(e) => handleHomeCallFilter(e)}
                                                                            />
                                                                            <label
                                                                                htmlFor={'homeCall'}>{t('common:home_call')}</label>
                                                                        </li>
                                                                        {
                                                                            allByFilterCategories ? allByFilterCategories.map((item, index) => {
                                                                                return (
                                                                                    <li key={item.id}>
                                                                                        <input type="radio"
                                                                                               id={item.name}
                                                                                               name={item.parent}
                                                                                               value={item.id}
                                                                                               checked={active === index}
                                                                                               onChange={(e) => handleCategoryFilter(e, index)}
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
                                                        <article>{t('common:selected_filter')}: <strong>{filterName ? filterName : t('common:no_filters_selected')}</strong>
                                                        </article>
                                                        {filterName ? <span><CloseIcon
                                                            callBack={handleClearFilters}/></span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={ALStyle.ListWrapper}>
                                                {
                                                    allAnalyzes && allAnalyzes.length > 0 ? allAnalyzes.map((a, index) => {
                                                            return (
                                                                <div className={'row mb-5'} key={a.id}>
                                                                    <div className={'col-lg-12'}>
                                                                        <AnalyzesCard inner={a} index={index}
                                                                                      id={a.id} loc={loc}/>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }) :
                                                        <div className={AnalyzesStyle.NoMatch}>
                                                            <h4>{t('common:no_analysis_found_in_this_category')}</h4>
                                                        </div>
                                                }
                                            </div>
                                        </TabPanel>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {
                        totalPagesCount && totalPagesCount > 1 ? <NextPrevPagination
                            nextSearchResults={handleNextPageAnalyzes}
                            prevSearchResults={handlePrevPageAnalyzes}
                            res={allAnalyzes}
                            page={page}
                            totalPages={totalPagesCount}
                        /> : null
                    }
                    <div className={'row mt-5'}>
                        <div className={'col-lg-12'}>
                            <div style={{textAlign: "left"}}>
                                <h4>{t('common:frequently_passed_tests')}</h4>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        </section>
    );
};

export default AnalyzesList;
