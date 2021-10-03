import React from 'react';
import './FaceView.css';
import { useState, useEffect } from 'react';
import { useWebsocket } from '../../contexts/websocket';
import {VideoStreaming} from "../../components/VideoStreaming";
import ReactPlayer from 'react-player';

const Eye = ({
    width = "100px",
    height = "100px",
    margin = "15px",
    translateX = "0",
    translateY = "-20px",
    transition = "all 1s",
}) => {

    return (
        <div
            style={{
                width,
                height,
                margin,
                transform: `translateX(${translateX}) translateY(${translateY})`,
                transition
            }}
            className="eye">
        </div>
    );

};

const normalSize = "120px";
const bigSize = "170px";
const normalXTranslate = "20px";
const normalYTranslate = "20px";

const FaceView = ({ }) => {

    const {
        voiceDetected,
        setVoiceDetected,
        voiceCommand,
        setVoiceCommand,
        img,
        setImg,
        isRecording,
        playVideoCommand,
        setPlayVideoCommand
    } = useWebsocket();

    const [leftWidth, setLeftWidth] = useState(normalSize),
        [leftHeight, setLeftHeight] = useState(normalSize),
        [rightWidth, setRightWidth] = useState(normalSize),
        [rightHeight, setRightHeight] = useState(normalSize),
        [leftTranslateX, setLeftTranslateX] = useState("-" + normalXTranslate),
        [rightTranslateX, setRightTranslateX] = useState(normalXTranslate),
        [leftTranslateY, setLeftTranslateY] = useState("-" + normalYTranslate),
        [rightTranslateY, setRightTranslateY] = useState("-" + normalYTranslate),
        [playVideo, setPlayVideo] = useState(false);

    useEffect(() => {
        const blinking = setInterval(() => {
            setLeftHeight("0px");
            setRightHeight("0px");

            setTimeout(() => {
                setLeftHeight(normalSize);
                setRightHeight(normalSize);
            }, 300);

        }, 8000);

        return () => {
            clearInterval(blinking);
        }
    }, [voiceDetected]);

    useEffect(() => {
        if (voiceDetected === 'astro') {
            listen();
        }
    }, [voiceDetected]);

    useEffect(() => {
        if (voiceCommand === 'hora') {
            //shake();
        }
    }, [voiceCommand]);

    useEffect(() => {
        if(!isRecording) setImg(null);
    }, [isRecording]);

    useEffect(() => {
        if(playVideoCommand) {
            console.log("Playing video");
            showVideo();
            setPlayVideoCommand(null);
        }
    }, [playVideoCommand]);

    const showVideo = () => {
        setPlayVideo(true);
    };

    const handleVideoEnded = () => {
        setPlayVideo(false);
    }

    const surprise = () => {
        setLeftHeight(bigSize);
        setLeftWidth(bigSize);

        setTimeout(() => {
            setLeftHeight(normalSize);
            setLeftWidth(normalSize);
        }, [1500]);
    };

    const listen = () => {
        setLeftHeight(bigSize);
        setLeftWidth(bigSize);

        setRightHeight(bigSize);
        setRightWidth(bigSize);

        setLeftTranslateY("30px");
        setRightTranslateY("30px");

        setTimeout(() => {
            setLeftHeight(normalSize);
            setLeftWidth(normalSize);

            setRightHeight(normalSize);
            setRightWidth(normalSize);

            setLeftTranslateY("-" + normalYTranslate);
            setRightTranslateY("-" + normalYTranslate);

            setVoiceDetected(null);
        }, [4000]);
    };

    const shake = () => {
        for (let i = 0; i <= 5; i++) {
            setTimeout(() => {
                const leftX = `-${randomNumber(0, 25)}px`,
                    rightX = `${randomNumber(0, 25)}px`,
                    leftY = `-${randomNumber(0, 25)}px`,
                    rightY = `-${randomNumber(0, 25)}px`;

                setLeftTranslateX(leftX);
                setRightTranslateX(rightX);

                setLeftTranslateY(leftY);
                setRightTranslateY(rightY);
            }, [100 * i]);
        }

        setTimeout(() => {
            setLeftTranslateX("-" + normalXTranslate);
            setRightTranslateX(normalXTranslate);

            setLeftTranslateY("-" + normalYTranslate);
            setRightTranslateY("-" + normalYTranslate);

            setVoiceCommand(null);
        }, 600);
    };

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    return (
        <>
            <div>
                <div>
                    <h1>Gracias por ser nuestra presidenta, Elena.</h1>
                </div>
            </div>
        </>
    );

};

export default FaceView;

