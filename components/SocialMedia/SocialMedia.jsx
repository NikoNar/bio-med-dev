import React from 'react';
import SocialStyle from './social.module.scss'


import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon, LinkedinShareButton,
    TelegramIcon, TelegramShareButton,
} from 'react-share'
import {mainUrl} from "../../utils/url";
const SocialMedia = ({link, title, picture}) => {
    return (
        <div className={SocialStyle.List}>
                <FacebookShareButton
                    url={mainUrl + link}
                    quote={title}
                    picture={picture}
                    title={title}
                >
                    <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>
                <LinkedinShareButton
                    url={mainUrl + link}
                    quote={title}
                    picture={picture}
                    title={title}
                >
                    <LinkedinIcon size={32} round={true}/>
                </LinkedinShareButton>
                <TelegramShareButton
                    url={mainUrl + link}
                    quote={title}
                    picture={picture}
                    title={title}
                >
                    <TelegramIcon size={32} round={true}/>
                </TelegramShareButton>
        </div>
    );
};

export default SocialMedia;
