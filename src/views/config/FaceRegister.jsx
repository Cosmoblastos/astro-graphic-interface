import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useRecordWebcam } from 'react-record-webcam'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    video: {
        borderRadius: '50%',
        objectFit: 'cover',
        width: '410px',
        height: '400px',
    },
    '@keyframes rotate': {
        "100%": {
            transform: 'rotate(1turn)'
        }
    },
    '@keyframes opacityChange': {
        '50%': {
            opacity: 1
        },
        '100%': {
            opacity: .5
        }
    },
    rainbow: {
        position: 'relative',
        zIndex: '0',
        width: '400px',
        height: '300px',
        borderRadius: '10px',
        overflow: 'hidden',
        padding: '2rem',

        '&::before': {
            content: '',
            position: 'absolute',
            zIndex: '-2',
            left: '-50%',
            top: '-50%',
            width: '200%',
            height: '200%',
            backgroundColor: '#399953',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '50% 50%, 50% 50%',
            backgroundPosition: '0 0, 100% 0, 100% 100%, 0 100%',
            backgroundImage: 'linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5)',
            animation: '$rotate 4s linear infinite'
        },
        '&::after': {
            content: '',
            position: 'absolute',
            zIndex: '-1',
            left: '6px',
            top: '6px',
            width: 'calc(100% - 12px)',
            height: 'calc(100% - 12px)',
            background: 'white',
            borderRadius: '5px',
            animation: '$opacityChange 3s infinite alternate',
        }
    }
}))

export default function FaceRegister () {
    const recordWebcam = useRecordWebcam(),
        classes = useStyles(),
        [initialized, setInitialized] = useState(false);

    const saveFile = async () => {
        const blob = await recordWebcam.getRecording();
        console.log(blob);
    };

    useEffect(() => {
        if (initialized) return;
        recordWebcam.open();
        recordWebcam.start();

        setTimeout(() => {
            recordWebcam.stop(); 
        }, 10000);
        setInitialized(true);
    }, [initialized]);

    return <Box className={classes.root}>
      <video className={classes.video} ref={recordWebcam.webcamRef} autoPlay muted />
    </Box>
};