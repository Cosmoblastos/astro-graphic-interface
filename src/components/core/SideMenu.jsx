import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemButton, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext } from 'react';
import EventContext from './EventContext';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TagFacesIcon from '@mui/icons-material/TagFaces';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'transparent !Important',
    },
    container: {
        width: 90,
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
    },
    list: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2)
    },
    option: {
        width: '100%',
        height: '8vh',
        borderRadius: 0
    }
}));

export default function SideMenu ({ anchor = 'right' }) {
    const classes = useStyles(),
        router = useHistory(),
        { openDrawer, setOpenDrawer } = useContext(EventContext);

    const toggleDrawer = useCallback((toggleValue) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setOpenDrawer(toggleValue);
    }, [setOpenDrawer]);

    return <Drawer
        anchor={anchor}
        open={openDrawer}
        disablePortal
        elevation={0}
        onClose={toggleDrawer(false)}
        BackdropProps={{ invisible: true }}
        classes={{ paper: classes.paper }}
    >
        <Box
            className={classes.container}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box className={classes.list}>
                {
                    [
                        {
                            name: 'Astro',
                            icon: <TagFacesIcon/>,
                            action: () => router.push('/')
                        },
                        {
                            name: 'Configuration',
                            icon: <SettingsIcon/>,
                            action: () => router.push('/config')
                        },
                        {
                            name: 'Off',
                            icon: <PowerSettingsNewIcon />,
                            action: () => console.log('off')
                        }
                    ].map((option, index) => (
                        <IconButton 
                            className={classes.option} 
                            key={option.name}
                            onClick={option.action}
                            size={'large'}
                        >
                            {option.icon}
                        </IconButton>
                    ))
                }
            </Box>
        </Box>
    </Drawer>
}