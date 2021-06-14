import React from 'react';
import PaginationStyle from './pagination.module.scss'


const Pagination = ({ callBackPrev,
                        callBackNext,
                        totalPageCount,
                        page,
                        link,
                        router,
                        limit
                    }) => {
    const pages = []
    const lastPage = totalPageCount
    for (let i = 1; i <= totalPageCount; i++) {
        pages.push(i)
    }

    return (
        <section className={PaginationStyle.Pagination} style={{display: pages.length <= 1 ? 'none' : 'flex'}}>
            <ul>
                <li>
                    <button onClick={callBackPrev} disabled={page <= 1}>
                        <span className="_icon-chevrone_left"></span>
                    </button>
                </li>
                <li><span style={{display: page === lastPage ? 'block' : 'none'}}>...</span></li>
                {
                    pages.map((p) => {
                        if (p >= page && p <= page + 1) {
                            console.log(page);
                            return (
                                <li key={p}>
                                    <button
                                        onClick={() => router.push(link + p)}
                                        className={p === page ? PaginationStyle.Active : ''}
                                        disabled={p===page}
                                    >{p}</button>
                                </li>
                            )
                        }
                    })
                }
                <li><span style={{display: page < lastPage ? 'block' : 'none'}}>...</span></li>
                <li>
                    <button onClick={callBackNext} disabled={page >= totalPageCount}>
                        <span className="_icon-chevrone_right"></span>
                    </button>
                </li>
            </ul>
        </section>
    );
};

export default Pagination;


/*
<li><a href="#"><span className="_icon-chevrone_left"></span></a></li>
<li className="active-page"><a href="#">1</a></li>
<li><a href="#">2</a></li>
<li><a href="#">...</a></li>
<li><a href="#"><span className="_icon-chevrone_right"></span></a></li>*/
