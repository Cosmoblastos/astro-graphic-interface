import { useQuery } from '@apollo/client';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_QUESTIONNAIRE_BY_ID } from '../../components/gql/questions';
import AssistantFace from '../config/AssistantFace';
import QuestionnaireProgression from './QuestionnaireProgression';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingTop: theme.spacing(4)
    }
}));

export default function QuestionnaireDetail ({ }) {
    const { id } = useParams(),
        { loading, error, data } = useQuery(GET_QUESTIONNAIRE_BY_ID, { variables: { id } }),
        [questionnaire, setQuestionnaire] = useState(),
        [answers, setAnswers] = useState([]),
        [step, setStep] = useState(-1),
        classes = useStyles();

    const nextStep = useCallback(() => {
        if (step === questionnaire?.questions?.length-1) return;
        setStep(step + 1);
    }, [step, questionnaire]);

    const prevStep = useCallback(() => {
        if (step === -1) return;
        setStep(step - 1);
    }, [step]);

    useEffect(() => {
        if (!data) return;
        setQuestionnaire(data?.fullQuestionnaire);
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.toString()}</p>
        
    return <Box className={classes.root}>
        {
            step === -1 && <Container>
                <Grid container spacing={2}>
                    {/* <Grid item xs={4}>
                        <Box p={2}>
                            <AssistantFace />
                        </Box>
                    </Grid> */}
                    <Grid item xs={8}>
                        <Box display={'flex'} alignItems={'center'} height={'100%'}>
                            <Typography variant={'h2'}>
                                {questionnaire?.name}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body'}>
                            {questionnaire?.description || 'Aquí va una descripción'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box 
                            width={'100%'} height={'fit-content'} display={'flex'} 
                            alignItems={'center'} justifyContent={'center'}
                        >
                            <Button variant={'contained'} color={'secondary'} onClick={nextStep}>
                                Start Questionnaire
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        }
        {
            step >= 0 && <QuestionnaireProgression 
                questionnaire={questionnaire}
                answers={answers}
                onAnswersChange={setAnswers}
                currentQuestionIndex={step}
                onNextQuestion={nextStep}
                onPrevQuestion={prevStep}
            />
        }
    </Box>
}