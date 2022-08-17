import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {Box, Button, Fade, Typography} from "@mui/material";
import AssistantFace from "./AssistantFace";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import VoiceInstruction from "./VoiceInstruction";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    step: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
}));

const VIEW_INSTRUCTIONS = [
    {
        say: '¡Hello! I\'m Astro, your personal medical assistant',
    },
    {
        say: 'What\'s your name?',
        response: {
            waitFor: true,
            expectedType: 'string',
            expectedValueName: 'name'
        }
    },
    {
        say: 'Nice to meet you (name)',
    },
    {
        say: 'To provide you better assistance, I would like to ask you some questions.',
    },
    {
        say: 'You should fill the necessary fields, and the another ones can be edited after this process',
    },
    {
        say: 'Let\'s start',
    },
];

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

function ViewInstruction ({ speaking, active, instruction, onNext, onSpeaking, onDataChange }) {
    const classes = useViewInstructionStyles(),
        [showContinue, setShowContinue] = useState(false),
        [timeOutCount, setTimeOutCount] = useState(-1),
        [reverseCountInterval, setReverseCountInterval] = useState(null);

    const handleSpeakingDone = useCallback(() => {
        setTimeOutCount(3);
        const rci = setInterval(() => {
            setTimeOutCount((prevTime) => prevTime - 1);
        }, 1000);
        setReverseCountInterval(rci);
    }, [timeOutCount, setTimeOutCount]);

    useEffect(() => {
        const t = setTimeout(() => {
            setShowContinue(true);
        }, 800);

        return () => {
            clearTimeout(t);
        }
    }, []);

    useEffect(() => {
        if (timeOutCount === -1) return;
        if (timeOutCount <= 0) {
            if (reverseCountInterval) clearInterval(reverseCountInterval);
            onNext();
        }
    }, [timeOutCount]);

    return active && <Fade in={true} timeout={3 * 1000}>
        <div className={classes.step}>
            <Box p={4} className={classes.instruction}>
                {
                    instruction?.say && <VoiceInstruction
                        instruction={instruction}
                        onResponse={onDataChange}
                        onSpeaking={onSpeaking}
                        onSpeakingDone={!instruction?.response?.waitFor && handleSpeakingDone}
                    >
                        <Typography variant={'h5'} align={'center'}>
                            {instruction.say}
                        </Typography>
                    </VoiceInstruction>
                }
            </Box>
            <Box className={classes.instruction} pb={4}>
                {
                    (!speaking && timeOutCount !== -1) && <Typography
                        variant={'caption'}
                        onClick={() => clearInterval(reverseCountInterval)}
                        style={{ cursor: 'pointer' }}
                    >
                        Automatically going next into: {timeOutCount}. Press to cancel.
                    </Typography>
                }
            </Box>
            {
                (showContinue && !speaking) && <Fade in={showContinue} timeout={3 * 1000}>
                    <Button
                        variant={'outlined'} color={'secondary'}
                        endIcon={<ArrowCircleRightIcon />}
                        onClick={onNext}
                    >
                        Continue
                    </Button>
                </Fade>
            }
        </div>
    </Fade>
}

export default function NewUserConfigView () {
    const classes = useStyles(),
        [step, setStep] = useState(0),
        [speaking, setSpeaking] = useState(false),
        [userData, setUserData] = useState({
            name: '',
        });

    const handleSetUserData = useCallback((newData) => {
        setUserData((prevData) => ({
            ...prevData,
            [newData.name]: newData.value
        }));
    }, [userData]);

    const handleSpeaking = useCallback((isSpeaking) => {
        setSpeaking(isSpeaking)
    }, [ setSpeaking ]);

    const mapWithVariables = useCallback((row) => {
        const regex = new RegExp(/\(([^)]+)\)/);
        if (!regex.test(row?.say)) return row;
        const varName = (regex.exec(row?.say))[1];
        const formValue = userData[varName];
        row.say = row.say.replace(regex, formValue);
        return row;
    }, [userData]);

    return <Box className={classes.root}>
        <div className={classes.step}>
            <AssistantFace speaking={speaking} />
            {
                VIEW_INSTRUCTIONS.map(mapWithVariables).map((instruction, index) => {
                    return <ViewInstruction
                        instruction={instruction}
                        speaking={speaking}
                        active={step === index}
                        onNext={() => setStep(index + 1)}
                        onSpeaking={handleSpeaking}
                        onDataChange={handleSetUserData}
                    />
                })
            }
        </div>
    </Box>;
}