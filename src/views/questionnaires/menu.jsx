import { useApolloClient } from '@apollo/client';
import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SquareCard } from '../../components/atomic';
import { GET_QUESTIONNAIRES } from '../../components/gql/questions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
}));

export default function QuestionnairesMenuView () {
    const apolloClient = useApolloClient(),
        [data, setData] = useState([]),
        [loading, setLoading] = useState(false),
        [initialized, setInitialized] = useState(false),
        router = useHistory(),
        classes = useStyles();

    const fetchData = useCallback(async () => {
        const { errors, data } = await apolloClient.query({
            query: GET_QUESTIONNAIRES
        });
        if (errors?.length > 0) throw new Error(errors[0].message);
        return data.questionnaires;
    });

    const handleFetch = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchData();
            setData(data);
        } catch (error) {
            console.error('Error while fetching questionnaires: ', error);
        } finally {
            setLoading(false);
        }
    });

    useEffect(() => {
        if (initialized) return;
        handleFetch();
        setInitialized(true);
    });

    return <Box className={classes.root}>
        <Box pb={2}>
            <Typography variant={'h5'}>
                Questionnaires
            </Typography>
        </Box>
        <Box className={classes.container}>
            {
                data?.length > 0 && data.map((questionnaire, index) => (
                    <SquareCard 
                        key={index}
                        icon={
                            <Avatar>
                                {questionnaire.name[0]}
                            </Avatar>
                        }
                        label={questionnaire.name}
                        onClick={() => router.push('/questionnaires/' + questionnaire.id)}
                    />
                ))
            }
        </Box>
    </Box>
};