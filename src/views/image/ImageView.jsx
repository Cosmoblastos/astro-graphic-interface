import React, {useEffect, useState} from 'react'
import './styles.css'
import { useHistory, useLocation } from "react-router-dom";
import {isValidHttpUrl} from "../face/utils";

export default function ImageView ({ }) {
    const [imageSource, setImageSource] = useState(),
        [imageAlt, setImageAlt] = useState('astro-image-render'),
        location = useLocation(),
        router = useHistory();

    const handleCloseImage = () => {
        router.replace('/');
    };

    useEffect(() => {
        if (!location?.state) return;
        let is = location.state?.payload;
        if (!is) {
            console.log('No source provided on location');
            return;
        }
        if (!isValidHttpUrl(is)) is = '/' + is;
        setImageSource(is);
    }, [location]);

    return <div className={'image-container'}>
        {
            imageSource
                ? <div>
                    <button className={'close-button'} onClick={handleCloseImage}>
                        X
                    </button>
                    <img src={imageSource} className={'image'} alt={imageAlt} />
                </div>
                : <h2>No image source provided</h2>
        }
    </div>
}