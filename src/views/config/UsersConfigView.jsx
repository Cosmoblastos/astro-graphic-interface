import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Box, Card, CardActionArea, CardContent, IconButton, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import AddIcon from '@mui/icons-material/Add';
import {gql, useQuery} from "@apollo/client";
import EventContext from "../../components/core/EventContext";
import LoadingView from "../Loading";
import {useHistory} from "react-router-dom";

const TEST_DATA = [
    {
        id: 'guest',
        name: 'Guest',
        color: '#70DDFF',
    },
    {
        id: 'blablabla',
        name: 'Alejandro Gómez García',
        color: 'red'
    }
];
const LIST_DATA_QUERY = gql`
    query listUsers ($filter: UsersFilter, $ord: String, $asc: Boolean, $num: Int, $pag: Int) {
        users (
            filter: $filter
            ord: $ord
            asc: $asc
            num: $num
            pag: $pag
        ) {
            totalCount
            data {
                id
                fullName
                firstName
                lastName
                color
                createdAt
                updatedAt
                deletedAt
            }
        }
    }
`;


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    userCardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
}));

const useSquareCardStyles = makeStyles((theme) => ({
    root: {
        width: '23vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        margin: theme.spacing(2)
    },
    card: (styles) => ({
        width: '22vh',
        height: '22vh',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: 'bold',
        '&.MuiPaper-root': {
            backgroundColor: '#70DDFF',
            ...styles,
        }
    }),
    label: {
        width: '20vh',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    cardContent: {
        height: 'calc(22vh - 4px)',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 'bold',
        fontSize: '4rem',
    }
}));

function SquareCard ({ icon, label, styles, onClick }) {
    const classes = useSquareCardStyles(styles);

    return <Box className={classes.root}>
        <Card className={classes.card} onClick={onClick}>
            <CardActionArea>
                <CardContent className={classes.cardContent}>
                    {icon}
                </CardContent>
            </CardActionArea>
        </Card>
        <Box pt={2} />
        <Typography variant={'h6'} align={'center'} className={classes.label}>
            {label}
        </Typography>
    </Box>
}

function UserCard ({ data, onClick }) {
    const handleClick = useCallback(() => {
        onClick(data);
    }, [data, onClick]);

    return <SquareCard
        icon={data?.fullName[0]?.toUpperCase() || '--'}
        label={data?.fullName}
        styles={{
            backgroundColor: data?.color || '#70DDFF',
        }}
        onClick={handleClick}
    />
}

export default function UsersConfigView () {
    const classes = useStyles(),
        { data, loading, error } = useQuery(LIST_DATA_QUERY),
        [users, setUsers] = useState([]),
        history = useHistory();

    const handleUserSelected = useCallback((selectedUser) => {
        console.log(selectedUser);
    }, []);

    const handleAddNewUser = useCallback(() => {
        history.push('/config/newUser');
    }, [history]);

    useEffect(() => {
        if (!data) return;
        setUsers(data?.users?.data);
    }, [data]);

    if (loading) return <LoadingView />;

    return <Box className={classes.root}>
        <Box className={classes.userCardsContainer}>
            {
                users?.length > 0 && users?.map((user) => (
                    <UserCard key={user?.id} data={user} onClick={handleUserSelected} />
                ))
            }
            <SquareCard
                icon={<AddIcon fontSize={'large'}/>}
                label={'New User'}
                styles={{
                    backgroundColor: 'transparent',
                    border: '4px solid #fff',
                }}
                onClick={handleAddNewUser}
            />
        </Box>
    </Box>;
}