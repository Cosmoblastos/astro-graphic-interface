import React, {useState, useEffect} from 'react';
import { makeStyles } from "@mui/styles";
import {gql, useSubscription} from "@apollo/client";
import {Box, Button, CircularProgress, Fade, Typography} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const VOICE_INSTRUCTION_SUBSCRIPTION = gql`
    subscription voiceInstruction ($instruction: Instruction!) {
        voiceInstruction (instruction: $instruction) {
            responseId
            success
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplate: '1fr / 1fr 40px',
        width: 'fit-content',
        transform: 'translate(20px, 0)'
    },
    feedback: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
}));

function VoiceInstruction ({ instruction, children  }) {
    const voiceInstructionResponse = useSubscription(
            VOICE_INSTRUCTION_SUBSCRIPTION,
            { variables: { instruction } }
        ),
        classes = useStyles();

    useEffect(() => {
        if (voiceInstructionResponse?.data) console.log(voiceInstructionResponse?.data);
        if (voiceInstructionResponse?.error) console.log(voiceInstructionResponse?.error)
    }, [voiceInstructionResponse]);

    return <div className={classes.root}>
        {children}
        <div className={classes.feedback}>
            { voiceInstructionResponse?.loading && <CircularProgress style={{ color: 'aqua', width: '20px', height: '20px'}} /> }
            { voiceInstructionResponse?.data && <CheckCircleOutlineIcon /> }
            { voiceInstructionResponse?.error && <ErrorOutlineIcon /> }
        </div>
    </div>
}

export default React.memo(VoiceInstruction);