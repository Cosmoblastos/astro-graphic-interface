import React, {useCallback, useEffect, useState} from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import VoiceInstruction from "./VoiceInstruction";
import FaceRegister from './FaceRegister';
import { useRef } from 'react';
import {Box, Button, Fade, Grid, Icon, IconButton, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";


const useViewInstructionStyles = makeStyles(() => ({
    step: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    instruction: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

export default function ViewInstruction ({ pause, speaking, active, instruction, onNext, onSpeaking, onDataChange }) {
    const classes = useViewInstructionStyles(),
        [showContinue, setShowContinue] = useState(false),
        [timeOutCount, setTimeOutCount] = useState(-1),
        [reverseCountInterval, setReverseCountInterval] = useState(null),
        prevPauseValue = useRef();

    const handleSpeakingDone = useCallback(() => {
        setTimeOutCount(3);
        const rci = setInterval(() => {
            setTimeOutCount((prevTime) => prevTime - 1);
        }, 800);
        setReverseCountInterval(rci);
    }, [timeOutCount, setTimeOutCount]);

    const handleClear = useCallback(() => {
        if (reverseCountInterval) clearInterval(reverseCountInterval);
    }, [reverseCountInterval]);

    const handleReplay = useCallback(() => {
        handleClear();
        onNext(-1);
    }, [onNext, handleClear]);

    useEffect(() => {
        const t = setTimeout(() => {
            setShowContinue(true);
        }, 800);

        return () => {
            clearTimeout(t);
        }
    }, []);

    useEffect(() => {
        prevPauseValue.current = pause;
        if (pause) handleClear();
        else if (!pause && prevPauseValue.current !== pause) onNext();
    }, [pause]);

    useEffect(() => {
        if (timeOutCount === -1) return;
        if (timeOutCount <= 0) {
            handleClear();
            onNext();
        }
    }, [timeOutCount]);

    return active && <Fade in={true} timeout={3 * 1000}>
        <div className={classes.step}>
            <Box p={4} className={classes.instruction}>
                {
                    instruction?.say && <VoiceInstruction
                        pause={pause}
                        instruction={instruction}
                        onResponse={onDataChange}
                        onSpeaking={onSpeaking}
                        onSpeakingDone={handleSpeakingDone}
                        onReplay={handleReplay}
                    >
                        <Typography variant={'h5'} align={'center'}>
                            {instruction.say}
                        </Typography>
                    </VoiceInstruction>
                }
            </Box>
            <Box className={classes.instruction} pb={4}>
                <Fade in={(!speaking && timeOutCount !== -1)} timeout={1 * 1000}>
                    <Typography
                        variant={'caption'}
                        onClick={() => clearInterval(reverseCountInterval)}
                        style={{ cursor: 'pointer' }}
                    >
                        Automatically going next into: {timeOutCount}. Press to cancel.
                    </Typography>
                </Fade>
            </Box>
            {/* {
                (showContinue && !speaking) && <Fade in={showContinue} timeout={3 * 1000}>
                    <Button
                        variant={'outlined'} color={'secondary'}
                        endIcon={<ArrowCircleRightIcon />}
                        onClick={onNext}
                    >
                        Continue
                    </Button>
                </Fade>
            } */}
        </div>
    </Fade>
}