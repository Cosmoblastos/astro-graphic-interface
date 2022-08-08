import React from 'react';
import './FaceView.css';
import { useState, useEffect } from 'react';
import {Eye} from "../../components/Face";
import {
    randomNumber
} from "./utils";
import {Box} from "@mui/material";
import {makeStyles} from "@mui/styles";

const normalSize = "130px";
const bigSize = "170px";
const normalXTranslate = "30px";
const normalYTranslate = "30px";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: theme.palette.background.default
    },
    face: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80vw',
        height: '60vh',
        padding: '10px',
        borderRadius: '35px',
    }
}));

const FaceView = () => {
    const [leftWidth, setLeftWidth] = useState(normalSize),
        [leftHeight, setLeftHeight] = useState(normalSize),
        [rightWidth, setRightWidth] = useState(normalSize),
        [rightHeight, setRightHeight] = useState(normalSize),
        [leftTranslateX, setLeftTranslateX] = useState("-" + normalXTranslate),
        [rightTranslateX, setRightTranslateX] = useState(normalXTranslate),
        [leftTranslateY, setLeftTranslateY] = useState("-" + normalYTranslate),
        [rightTranslateY, setRightTranslateY] = useState("-" + normalYTranslate),
        classes = useStyles();

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

    return <Box className={classes.root}>
        <div className={classes.face}>
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
    </Box>
};

export default FaceView;

