import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {Box, Button, Fade, Typography} from "@mui/material";
import AssistantFace from "./AssistantFace";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {useApolloClient, useSubscription} from "@apollo/client";
import {gql} from "@apollo/client";
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
    instruction: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const VIEW_INSTRUCTIONS = [
    {
        say: '¡Hello! I\'m Astro, your personal medical assistant',
        waitForResponse: false,
    },
    {
        say: 'What\'s your name?',
        waitForResponse: true,
    },
    {
        say: 'Nice to meet you (name)',
    },
    {
        say: 'To provide you better assistance, I would like to ask you some questions.',
        waitForResponse: false,
    },
    {
        say: 'You should fill the necessary fields, and the another ones can be edited after this process',
        waitForResponse: false,
    },
    {
        say: 'Let\'s start',
        waitForResponse: false,
    },
];

export default function NewUserConfigView () {
    const classes = useStyles(),
        [showContinue, setShowContinue] = useState(false),
        [step, setStep] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setShowContinue(true);
        }, 1000);
    }, []);

    const continueButton = <Fade in={showContinue} timeout={3 * 1000}>
        <Button
            variant={'outlined'} color={'secondary'}
            endIcon={<ArrowCircleRightIcon />}
            onClick={() => setStep(step + 1)}
        >
            Continue
        </Button>
    </Fade>;

    return <Box className={classes.root}>
        {
            step === 0 && <Fade in={true} timeout={3 * 1000}>
                <div className={classes.step}>
                    <AssistantFace />
                    <Box p={4} className={classes.instruction}>
                        <VoiceInstruction instruction={{ say: '¡Hello! I\'m Astro, your new personal medical assistant' }}>
                            <Typography variant={'h5'} align={'center'}>
                                ¡Hello! <br />
                                I'm Astro, your new personal medical assistant...
                            </Typography>
                        </VoiceInstruction>
                    </Box>
                    {continueButton}
                </div>
            </Fade>
        }
        {
            step === 1 && <Fade in={true} timeout={3 * 1000}>
                <div className={classes.step}>
                    <AssistantFace />
                    <Box p={4} className={classes.instruction}>
                        <VoiceInstruction instruction={{ say: 'To give you better assistance, I would like to know more about you' }}>
                            <Typography variant={'h5'} align={'center'}>
                                To give you better assistance, I would like to know more about you...
                            </Typography>
                        </VoiceInstruction>
                    </Box>
                    {continueButton}
                </div>
            </Fade>
        }
    </Box>;
}