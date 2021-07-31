import React from 'react';
import SocialStyle from './social.module.scss'


import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon, LinkedinShareButton,
    TelegramIcon, TelegramShareButton,
} from 'react-share'
import {mainUrl} from "../../utils/url";
const SocialMedia = ({link, title, picture, loc}) => {
    return (
        <div className={SocialStyle.List}>
                <FacebookShareButton
                    url={mainUrl+ `/${loc}` + link}
                >
                    <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>
                <LinkedinShareButton
                    url={mainUrl + `/${loc}`+ link}
                >
                    <LinkedinIcon size={32} round={true}/>
                </LinkedinShareButton>
                <TelegramShareButton
                    url={mainUrl + `/${loc}`+ link}
                >
                    <TelegramIcon size={32} round={true}/>
                </TelegramShareButton>
        </div>
    );
};

export default SocialMedia;
