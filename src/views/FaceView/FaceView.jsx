import React from 'react';
import './FaceView.css';
import { useState, useEffect } from 'react';

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

const FaceView = ({ }) => {

    const [leftWidth, setLeftWidth] = useState("100px"),
        [leftHeight, setLeftHeight] = useState("100px"),
        [rightWidth, setRightWidth] = useState("100px"),
        [rightHeight, setRightHeight] = useState("100px"),
        [leftTranslateX, setLeftTranslateX] = useState("-10px"),
        [rightTranslateX, setRightTranslateX] = useState("10px");

    useEffect(() => {
        blinkRight();
        blinkLeft();
        surprise();
        //shake();
    }, []);

    const blinkLeft = () => {

        const blinking = setInterval(() => {
            setLeftHeight("0px");

            setTimeout(() => {
                setLeftHeight("100px");
            }, 300);

        }, 4000);

        return () => {
            clearInterval(blinking);
        }
    }

    const blinkRight = () => {

        const blinking = setInterval(() => {
            setRightHeight("0px");

            setTimeout(() => {
                setRightHeight("100px");
            }, 300);

        }, 4000);

        return () => {
            clearInterval(blinking);
        }

    }

    const surprise = () => {
        const surprising = setInterval(() => {
            setLeftHeight("150px");
            setLeftWidth("150px");

            setTimeout(() => {
                setLeftHeight("100px");
                setLeftWidth("100px");
            }, [1500]);
        }, 7000);

        return () => {
            clearInterval(surprising);
        }
    };

    const shake = () => {
        const shaking = setInterval(() => {
            for (let i = 0; i <= 5; i++) {
                setTimeout(() => {
                    const leftX = `-${randomNumber(0, 25)}px`,
                        rightX = `${randomNumber(0, 25)}px`;

                    setLeftTranslateX(leftX);
                    setRightTranslateX(rightX);
                }, [100 * i]);
            }

            setTimeout(() => {
                setLeftTranslateX("-10px");
                setRightTranslateX("10px");
            }, 600);
        }, [5000])
    };

    const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    return (
        <>
            <div>
                <div className="face">
                    <Eye
                        transition={"all 0.4s"}
                        width={leftWidth}
                        height={leftHeight}
                        translateX={leftTranslateX}
                    />
                    <Eye
                        transition={"all 0.4s"}
                        width={rightWidth}
                        height={rightHeight}
                        translateX={rightTranslateX}
                    />
                </div>
            </div>
        </>
    );

};

export default FaceView;

