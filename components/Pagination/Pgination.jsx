import React from 'react';
import PaginationStyle from './pagination.module.scss'



const Pagination = () => {
    return (
        <section className={PaginationStyle.Pagination}>
            <ul>
                <li><a href="#"><span className="_icon-chevrone_left"></span></a></li>
                <li className="active-page"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">...</a></li>
                <li><a href="#"><span className="_icon-chevrone_right"></span></a></li>
            </ul>
        </section>
    );
};

export default Pagination;