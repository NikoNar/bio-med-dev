import React, {useEffect} from 'react';
import SocialStyle from './social.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchSocialMedia} from "../../redux/actions/getSocialMediaAction";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon, LinkedinShareButton,
    TelegramIcon, TelegramShareButton,
} from 'react-share'
const SocialMedia = ({link}) => {

    const social = useSelector(state => state.social)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSocialMedia())
    }, [])


    return (
        <div className={SocialStyle.List}>
                <FacebookShareButton url={process.env.NEXT_PUBLIC_LOCAL_HOST + link}>
                    <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>
                <LinkedinShareButton url={process.env.NEXT_PUBLIC_LOCAL_HOST + link}>
                    <LinkedinIcon size={32} round={true}/>
                </LinkedinShareButton>
                <TelegramShareButton url={process.env.NEXT_PUBLIC_LOCAL_HOST + link}>
                    <TelegramIcon size={32} round={true}/>
                </TelegramShareButton>
        </div>
    );
};

export default SocialMedia;
