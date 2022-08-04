import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import { useHistory, useLocation } from "react-router-dom";
import {isValidHttpUrl} from "../face/utils";

import './styles.css';

function VideoView () {
    const [playing, setPlaying] = useState(false),
        [videoSource, setVideoSource] = useState(null),
        router = useHistory(),
        location = useLocation();

    const onVideoEnded = () => {
        setPlaying(false);
        router.replace('/');
    };

    useEffect(() => {
        if (!location?.state) return;
        let vs = location?.state?.payload;
        if (!vs) return;
        if (!isValidHttpUrl(vs)) vs = '/' + vs;
        setVideoSource(vs);
        setTimeout(() => setPlaying(true), 0);
    }, [location]);

    return <div className='Video-container'>
        {
            videoSource
            ? <ReactPlayer
                playing={playing}
                width={'100vw'}
                height={'100vh'}
                url={videoSource}
                controls
                onEnded={onVideoEnded}
            />
            : <h2>No video source provided</h2>
        }
    </div>
}

export default VideoView;