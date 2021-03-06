import React, {useCallback} from 'react';
import './FaceView.css';
import { useState, useEffect } from 'react';
import {VideoStreaming} from "../../components/VideoStreaming";
import {useSubscription} from "@apollo/client";
import { gql } from '@apollo/client';
import ReactPlayer from 'react-player'

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

const COMMANDS_SUBSCRIPTION = gql`
    subscription voiceEvents {
        voiceEvents {
            type
            payload
        }
    }
`;

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const stabilization = (number, duration) => {

}

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}

const FaceView = () => {
    const {loading, data, error} = useSubscription(COMMANDS_SUBSCRIPTION);
    const [leftWidth, setLeftWidth] = useState(normalSize),
        [leftHeight, setLeftHeight] = useState(normalSize),
        [rightWidth, setRightWidth] = useState(normalSize),
        [rightHeight, setRightHeight] = useState(normalSize),
        [leftTranslateX, setLeftTranslateX] = useState("-" + normalXTranslate),
        [rightTranslateX, setRightTranslateX] = useState(normalXTranslate),
        [leftTranslateY, setLeftTranslateY] = useState("-" + normalYTranslate),
        [rightTranslateY, setRightTranslateY] = useState("-" + normalYTranslate),
        [showVideo, setShowVideo] = useState(false),
        [showMetrics, setShowMetrics] = useState(false),
        [playing, setPlaying] = useState(false),
        [oximeter, setOximeter] = useState(0),
        [frequency, setFrequency] = useState(0),
        [temperature, setTemperature] = useState(0),
        [showTemperature, setShowTemperature] = useState(false),
        [videoSource, setVideoSource] = useState(null),
        [imageSource, setImageSource] = useState(null),
        [showImage, setShowImage] = useState(false),
        [showIframe, setShowIframe] = useState(false),
        [iframeSource, setIframeSource] = useState(null);

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
    }, []);

    const resetView = () => {
        setShowImage(false);
        setImageSource(null);
        setShowVideo(false);
        setShowMetrics(false);
        setFrequency(0);
        setOximeter(0);
        setVideoSource(null);
        setShowTemperature(false);
        setTemperature(0);
        setShowIframe(false);
        setIframeSource(null);
    };

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

            //setVoiceDetected(null);
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

            //setVoiceCommand(null);
        }, 600);
    };

    useEffect(() => {
        if (loading) return;
        if (error) return console.error(error);
        if (!data) return;
        const eventName = data?.voiceEvents?.type;
        if (!eventName) return;

        switch (eventName) {
            case 'listen':
                resetView();
                listen();
                break;
            case 'show_webpage':
                const webPageURL = data?.voiceEvents?.payload;
                if (!webPageURL) return;
                if (!isValidHttpUrl(webPageURL)) return;
                setIframeSource(webPageURL);
                setTimeout(() => {
                    setShowIframe(true);
                }, 0);
                break;
            case 'metrics':
                setShowMetrics(true);
                let frequencyInterval = setInterval(() => {
                    setFrequency(randomNumber(80, 90))
                }, 1000);
                let oximeterInterval = setInterval(() => {
                    setOximeter(randomNumber(90, 100))
                }, 1000);
                setTimeout(() => {
                    clearInterval(frequencyInterval);
                    clearInterval(oximeterInterval);
                    setTimeout(() => {
                        setShowMetrics(false);
                    }, 3000);
                }, 8000);
                break;
            case 'temperature':
                setShowTemperature(true);
                let temperatureInterval = setInterval(() => {
                    setTemperature(randomNumber(35, 36.9))
                }, 1000);
                setTimeout(() => {
                    clearInterval(temperatureInterval);
                    setTimeout(() => {
                        setShowTemperature(false);
                    }, 3000);
                }, 8000);
                break;
            case 'show_video':
                let videoName = `/${data?.voiceEvents?.payload}`;
                console.log(videoName);
                setVideoSource(videoName);
                setTimeout(() => {
                    setShowVideo(true);
                }, 0);
                break;
            case 'show_image':
                let imageName = `/${data?.voiceEvents?.payload}`;
                setImageSource(imageName);
                setTimeout(() => {
                    setShowImage(imageName);
                }, 0);
                setTimeout(() => {
                    setShowImage(false);
                    setImageSource(null);
                }, 100000); //Fix momentaneo, no hacer esto en casa
                break;
            case 'emergencia':
                //cara de atenci??n
                //poner video de emergencia
                listen();
                setTimeout(() => {
                    setShowVideo(true);
                }, 1000);
                break;
            default:
                console.log('Invalid voice comand');
        }
    }, [loading, data, error]);

    useEffect(() => {
        setTimeout(() => {
            setPlaying(true);
        }, 500);
    }, [showVideo]);

    const handleVideoEnded = useCallback(() => {
        setPlaying(false);
        setShowVideo(false);
    }, []);

    if (showMetrics) return <>
        <div className="metrics">
            <div className="metric frequency">
                {frequency} <span className="metric_name">FC</span>
            </div>
            <div className="metric oximeter">
                {oximeter} <span className="metric_name">SpO2</span>
            </div>
        </div>
    </>;

    if (showTemperature) return <>
        <div className="metrics">
            <div className="metric frequency">
                {temperature} <span className="metric_name">??C</span>
            </div>
        </div>
    </>;

    if (showVideo && videoSource) return <>
        <div>
            <ReactPlayer
                playing={playing}
                width={'100vw'}
                height={'100vh'}
                url={videoSource}
                controls
                onEnded={handleVideoEnded}
            />
        </div>
    </>;

    if (showImage && imageSource) return <>
        <div>
            <img src={imageSource} className="full_screen_image"/>
        </div>
    </>;

    if (showIframe && iframeSource) return <>
        <iframe width={'100%'} height={'500px'} src={iframeSource} title={'ComunicationTool'} style={{border: 0}}/>
    </>;

    return <>
        <div className="face">
            <Eye
                transition={"all 0.4s"}
                width={leftWidth}
                height={leftHeight}
                translateX={leftTranslateX}
                translateY={leftTranslateY}
            />
            <Eye
                transition={"all 0.4s"}
                width={rightWidth}
                height={rightHeight}
                translateX={rightTranslateX}
                translateY={rightTranslateY}
            />
        </div>
    </>;
};

export default FaceView;

