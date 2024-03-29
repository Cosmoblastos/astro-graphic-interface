import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {Box, Button, Fade, Grid, Icon, IconButton, Toolbar, Typography} from "@mui/material";
import AssistantFace from "./AssistantFace";
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import CancelIcon from '@mui/icons-material/Cancel';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import MicIcon from '@mui/icons-material/Mic';
import { useHistory } from 'react-router-dom';
import ViewInstruction from './ViewInstruction';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'grid',
        gridTemplate: '1fr 0.1fr / 1fr'
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
        say: 'I have heard (name). Is that correct?',
        response: {
            waitFor: true,
            expectedType: 'string',
            expectedValueName: 'confirmation'
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

const useFlowControlToolsStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        opacity: '0.7',
        '&:hover': {
            opacity: '1'
        }
    },
    container: {
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    cancelIcon: {
        color: 'tomato',
    }
}));

function FlowControlTools ({ 
    isPaused, onPause, 
    onCancel, onReplay,
    isKeyboard, onKeyboard 
}) {
    const classes = useFlowControlToolsStyles();

    return <Toolbar className={classes.root}>
        <Grid container spacing={4} alignItems={'center'} justifyContent={'center'}>
            <Grid item>
                <IconButton size={'large'} onClick={onKeyboard}>
                    {isKeyboard ? <MicIcon /> : <KeyboardIcon />}
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton size={'large'} color={isPaused ? 'success' : 'warning'} onClick={onPause}>
                    {isPaused ? <PlayCircleIcon /> : <PauseCircleIcon />}
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton size={'large'} color={'info'} onClick={onReplay} disabled={!onReplay}>
                    <ReplayIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton size={'large'} color={'error'} onClick={onCancel} disabled={!onCancel}>
                    <CancelIcon />
                </IconButton>
            </Grid>
        </Grid>
    </Toolbar>
}

export default function NewUserConfigView () {
    const classes = useStyles(),
        router = useHistory(),
        [step, setStep] = useState(0),
        [isKeyboard, setIsKeyboard] = useState(false),
        [speaking, setSpeaking] = useState(false),
        [pause, setPause] = useState(false),
        [userData, setUserData] = useState({
            name: '',
        });

    const togglePause = () => {
        setPause((prev) => !!!prev);
    };

    const toggleKeyboard = () => {
        setIsKeyboard((prev) => !!!prev);
    };

    const handleCancel = () => {
        router.replace('/');
    };

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
        if (!formValue) return row;
        row.say = row.say.replace(regex, formValue);
        return row;
    }, [userData]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                
            });
    });

    return <Box className={classes.root}>
        <div className={classes.step}>
            <AssistantFace speaking={speaking} />
            {
                VIEW_INSTRUCTIONS.map(mapWithVariables).map((instruction, index) => {
                    return <ViewInstruction
                        key={index}
                        pause={pause}
                        instruction={instruction}
                        speaking={speaking}
                        active={step === index}
                        onNext={(sum = 1) => setStep(index + sum)}
                        onSpeaking={handleSpeaking}
                        onDataChange={handleSetUserData}
                    />
                })
            }
        </div>
        {/* <FaceRegister /> */}
        <FlowControlTools
            isKeyboard={isKeyboard}
            onKeyboard={toggleKeyboard}
            isPaused={pause}
            onPause={togglePause}
            onCancel={handleCancel}
        />
    </Box>;
}