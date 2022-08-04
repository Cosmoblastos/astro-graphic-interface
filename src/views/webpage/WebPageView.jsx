import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {isValidHttpUrl} from "../face/utils";

import './styles.css';

export default function WebPageView () {
    const [link, setLink] = useState(),
        location = useLocation(),
        router = useHistory();

    const handleCloseImage = () => {
        router.replace('/');
    };

    useEffect(() => {
        if (!location?.state) return;
        let is = location.state?.payload;
        if (!is) {
            console.log('No link provided');
            return;
        }
        if (!isValidHttpUrl(is)) is = '/' + is;
        setLink(is);
    }, [location]);

    return <div className={'webpage-container'}>
        {
            link
                ? <div style={{ height: '100vh' }}>
                    <button className={'close-button'} onClick={handleCloseImage}>
                        X
                    </button>
                    <iframe
                        width={'100%'}
                        height={'100%'}
                        src={link}
                        title={'astro-webpage-render'}
                        style={{border: 0}}
                    />
                </div>
                : <h2>No link provided to webpage render</h2>
        }
    </div>
}