import React from 'react';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { SquareCard } from '../../components/atomic';
import PeopleIcon from '@mui/icons-material/People';
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom';
import WifiIcon from '@mui/icons-material/Wifi';

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

const configOptions = [
    {
        icon: <PeopleIcon fontSize={'large'}/>,
        label: 'Users',
        styles: {
            backgroundColor: 'transparent',
            border: '4px solid #fff',
        },
        link: '/users',
    },
    {
        icon: <WifiIcon fontSize={'large'}/>,
        label: 'Wifi',
        styles: {
            backgroundColor: 'transparent',
            border: '4px solid #fff',
        },
        link: '/wifi',
    }
];

export default function ConfigView () {
    const classes = useStyles(),
        router = useHistory();

    return <Box className={classes.root}>
        <Box>
            <Typography>
                Configuración
            </Typography>
        </Box>
        <Box className={classes.container}>
            {
                configOptions.map((configBlock, index) => (
                    <SquareCard 
                        key={`${configBlock.label}-${index}`} 
                        {...configBlock}
                        onClick={() => router.push('/config' + configBlock.link)}
                    />
                ))
            }
        </Box>
    </Box>;
}