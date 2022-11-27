import { Container, Fade, Box, Typography, ListItem, ListItemText, ListItemIcon, ListItemAvatar, Toolbar, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import VoiceInstruction from '../config/VoiceInstruction';

const useVoiceOptionStyles = makeStyles((theme) => ({
    root: {
        width: 'fit-content',
        display: 'flex',
        aligItems: 'center',
        justifyContent: 'flex-start',
        margin: theme.spacing(2),
        borderRadius: '20px',
    },
    selected: {
        backgroundColor: '#fff',
        color: theme.palette.primary.main,
    },
    number: {
        borderRadius: '50%',
        fontSize: '2.5fr',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        width: '50px',
        height: '50px',
        display: 'grid',
        placeItems: 'center'
    },
    text: {
        paddingLeft: theme.spacing(2),
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

function VoiceOption ({ option, selected, onSpeakingDone }) {
    const classes = useVoiceOptionStyles();

    return <Box className={clsx(classes.root, {
        [classes.selected]: selected
    })}>
        <Box className={classes.number}>
            {option.order}
        </Box>
        <Box className={classes.text}>
            {
                option?.name && <VoiceInstruction
                    pause={false}
                    instruction={{ say: option.name }}
                    onResponse={() => {}}
                    onSpeaking={() => {}}
                    onSpeakingDone={() => {}}
                >
                    <Typography variant={'h5'} color={'inherit'}>
                        {option.name}
                    </Typography>
                </VoiceInstruction>
            }
        </Box>
    </Box>
}


const useVoiceQuestionStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    instruction: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

function VoiceOptionQuestion ({ selectedOption, active, question, onAnswer, onNextQuestion }) {
    const classes = useVoiceQuestionStyles();

    const parseAnswer = (value) => {
        value = String(value).trim().toLowerCase();
        if (!isNaN(value)) return parseInt(value);
        switch (value) {
            case 'uno':
                return 1;
            case 'dos':
                return 2;
            case 'tres':
                return 3;
            default: 
                return null;
        }
    };

    const handleAnswer = useCallback((data) => {
        console.log(data);
        const parsedAnswer = parseAnswer(data?.value);
        if (!parsedAnswer) {
            //TODO: manejar respuesta invalida
            console.log('Invalid value provided');
            return;
        }
        const selectedOption = question.options.findIndex((opt) => opt.order === parsedAnswer);
        if (selectedOption === -1) {
            //TODO: manejar opción invalida
            console.log('Invalid selected option');
            return;
        }
        onAnswer({
            questionId: question.id,
            optionIndex: selectedOption
        });
        setTimeout(() => {
            onNextQuestion();
        }, 3000);
    }, [question, onAnswer, onNextQuestion]);

    return active ? <Fade in timeout={3 * 1000}>
        <div className= {classes.root}>
            <Box width={'100%'} pt={4} pb={4}>
                {
                    question?.name && <VoiceInstruction
                        pause={false}
                        instruction={{ say: question.name }}
                        onResponse={() => {}}
                        onSpeaking={() => {}}
                        onSpeakingDone={() => {}}
                        onReplay={() => {}}
                    >
                        <Typography variant={'h3'}>
                            {question?.order}. {question?.name}
                        </Typography>       
                    </VoiceInstruction>
                }
            </Box>
            {
                question?.auxInfo && <Box>
                    <div dangerouslySetInnerHTML={{ __html: question.auxInfo }}/>
                </Box>
            }
            <Box>
                {
                    question.options.map((option, index) => (
                        <VoiceOption 
                            key={option?.id} 
                            option={option}
                            selected={selectedOption?.optionIndex === index}
                        />
                    ))
                }
            </Box>
            <Box>
                {
                    <VoiceInstruction
                        pause={false}
                        instruction={{
                            say: 'Elige un número de opción',
                            response: {
                                waitFor: true,
                                expectedType: 'number',
                                expectedValueName: 'answer'
                            }
                        }}
                        onResponse={handleAnswer}
                        onSpeaking={() => {}}
                        onSpeakingDone={() => {}}
                    >
                        Esperando respuesta: 
                    </VoiceInstruction>
                }
            </Box>
        </div>
    </Fade> : <></>;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '90vh',
        overflow: 'hidden',
    },
    floatingDiv: {
        width: '90%',
        height: 'fit-content',
    }
}));

export default function QuestionnaireProgression ({ 
    questionnaire,
    currentQuestionIndex,
    answers,
    onAnswersChange,
    onNextQuestion,
    onPrevQuestion,
}) {
    const classes = useStyles();

    const handleAnswer = useCallback((newAnswer) => {
        let newAnswers = [].concat(answers);
        let prevAnswerIndex = newAnswers.findIndex((a) => a.questionId === newAnswer.questionId);
        if (prevAnswerIndex === -1) newAnswers.push(newAnswer);
        else newAnswers[prevAnswerIndex] = newAnswer;
        onAnswersChange(newAnswers);
    }, [questionnaire, answers, onAnswersChange]);

    return <Box className={classes.root}>
        <Box className={classes.floatingDiv}>
            {
                questionnaire?.questions?.length > 0 && questionnaire.questions.map((question, index) => (
                    <VoiceOptionQuestion
                        key={question.id}
                        selectedOption={answers?.find(a => a.questionId === question.id)}
                        active={currentQuestionIndex === index}
                        question={question}
                        onAnswer={handleAnswer}
                        onNextQuestion={onNextQuestion}
                    />
                ))
            }
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-evenly'} pt={4}>
                <Button variant={'outlined'} color={'secondary'} onClick={onPrevQuestion}>
                    Prev
                </Button>
                <Button variant={'contained'} color={'secondary'} onClick={onNextQuestion}>
                    Next
                </Button>
            </Box>
        </Box>
    </Box>
}