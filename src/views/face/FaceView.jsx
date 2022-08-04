import React, {useCallback} from 'react';
import './FaceView.css';
import { useState, useEffect } from 'react';
import {useSubscription} from "@apollo/client";
import ReactPlayer from 'react-player'
import {Eye} from "../../components/Face";
import {COMMANDS_SUBSCRIPTION} from "../../components/gql/face";
import {
    isValidHttpUrl,
    randomNumber
} from "./utils";

const normalSize = "120px";
const bigSize = "170px";
const normalXTranslate = "20px";
const normalYTranslate = "20px";

const FaceView = () => {
    const [leftWidth, setLeftWidth] = useState(normalSize),
        [leftHeight, setLeftHeight] = useState(normalSize),
        [rightWidth, setRightWidth] = useState(normalSize),
        [rightHeight, setRightHeight] = useState(normalSize),
        [leftTranslateX, setLeftTranslateX] = useState("-" + normalXTranslate),
        [rightTranslateX, setRightTranslateX] = useState(normalXTranslate),
        [leftTranslateY, setLeftTranslateY] = useState("-" + normalYTranslate),
        [rightTranslateY, setRightTranslateY] = useState("-" + normalYTranslate),
        [temperature, setTemperature] = useState(0),
        [showTemperature, setShowTemperature] = useState(false);

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

    if (showTemperature) return <>
        <div className="metrics">
            <div className="metric frequency">
                {temperature} <span className="metric_name">ºC</span>
            </div>
        </div>
    </>;

    return <div className={'Face-container'}>
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
    </div>
};

export default FaceView;

