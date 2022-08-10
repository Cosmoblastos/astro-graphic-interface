import React, {useCallback, useState} from 'react';
import {Box, Card, CardActionArea, CardContent, IconButton, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import AddIcon from '@mui/icons-material/Add';

const TEST_DATA = [
    {
        id: 'invited',
        name: 'Invited',
        color: '#70DDFF',
    },
    {
        id: 'blablabla',
        name: 'Alejandro Gómez García',
        color: 'red'
    }
];

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
        icon={data?.name[0]?.toUpperCase() || '--'}
        label={data?.name}
        styles={{
            backgroundColor: data?.color || '#70DDFF',
        }}
        onClick={handleClick}
    />
}

export default function UsersConfigView () {
    const classes = useStyles(),
        [users, setUsers] = useState(TEST_DATA);

    const handleUserSelected = useCallback((selectedUser) => {
        console.log(selectedUser);
    }, []);

    const handleAddNewUser = useCallback(() => {
        console.log('Add new user');
    }, []);

    return <Box className={classes.root}>
        <Box className={classes.userCardsContainer}>
            {
                users?.length > 0 && users.map((user) => (
                    <UserCard key={user?.id} data={user} onClick={handleUserSelected} />
                ))
            }
            <SquareCard
                icon={<IconButton size={'large'}>
                    <AddIcon fontSize={'large'}/>
                </IconButton>}
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