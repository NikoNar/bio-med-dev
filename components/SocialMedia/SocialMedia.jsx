import React, {useEffect} from 'react';
import SocialStyle from './social.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchSocialMedia} from "../../redux/actions/getSocialMediaAction";
import Link from "next/link";

const SocialMedia = () => {

    const social = useSelector(state => state.social)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSocialMedia())
    }, [])


    return (
        <div className={SocialStyle.List}>
            <ul>
                {
                    social ? social.map((soc) => {
                        return (
                            <li key={soc.id}>
                                <Link href={soc.link} key={soc.id}>

                                    <a>
                                        <span className={soc.icon}></span>
                                    </a>
                                </Link>
                            </li>
                        )
                    }) : ''
                }
            </ul>
        </div>
    );
};

export default SocialMedia;