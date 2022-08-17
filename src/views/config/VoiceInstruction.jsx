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
            data {
                name
                type
                value
            }
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

function VoiceInstruction ({ instruction, children, onSpeaking, onSpeakingDone, onResponse  }) {
    const { data, loading, error } = useSubscription(
            VOICE_INSTRUCTION_SUBSCRIPTION,
            {
                variables: { instruction },
                shouldResubscribe: false
            }
        ),
        [initialized, setInitialized] = useState(false),
        classes = useStyles();

    useEffect(() => {
        onSpeaking(loading);
        if (
            instruction?.response?.waitFor
            && data?.voiceInstruction?.data
        ) {
            onResponse(data?.voiceInstruction?.data);
            onSpeakingDone();
            return;
        }
        if (error) console.log(error);
        if (!loading && initialized && typeof onSpeakingDone === 'function') onSpeakingDone();
    }, [data, error, loading]);

    useEffect(() => {
        setInitialized(true);
    });

    return <div className={classes.root}>
        {children}
        <div className={classes.feedback}>
            { loading && <CircularProgress style={{
                color: 'aqua', width: '20px', height: '20px'}}
            /> }
            { data && <CheckCircleOutlineIcon style={{ color: 'green' }} /> }
            { error && <ErrorOutlineIcon style={{}} /> }
        </div>
    </div>
}

export default React.memo(VoiceInstruction);