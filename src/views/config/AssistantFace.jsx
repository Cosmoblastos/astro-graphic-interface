import React from 'react';
import {Eye} from "../../components/Face";
import {makeStyles} from "@mui/styles";
import {useEffect, useState} from "react";

const useStyles = makeStyles((theme) => ({
    face: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '185px',
        height: '185px',
        padding: '10px',
        borderRadius: '35px',
        border: '5px solid aqua'
    },
    eyes: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mouth: {
        borderRadius: '0 0 50px 50px',
        border: '3px solid aqua',
        backgroundColor: 'aqua',
        borderTop: 0,
        width: '35px',
        height: '10px'
    }
}));

const normalSize = "30px";
const normalXTranslate = "10px";
const normalYTranslate = "10px";

export default function AssistantFace () {
    const classes = useStyles(),
        [leftWidth, setLeftWidth] = useState(normalSize),
        [leftHeight, setLeftHeight] = useState(normalSize),
        [rightWidth, setRightWidth] = useState(normalSize),
        [rightHeight, setRightHeight] = useState(normalSize),
        [leftTranslateX, setLeftTranslateX] = useState("-" + normalXTranslate),
        [rightTranslateX, setRightTranslateX] = useState(normalXTranslate),
        [leftTranslateY, setLeftTranslateY] = useState("-" + normalYTranslate),
        [rightTranslateY, setRightTranslateY] = useState("-" + normalYTranslate);

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

    return <div className={classes.face}>
        <div className={classes.eyes}>
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
        <div className={classes.mouth}/>
    </div>
}