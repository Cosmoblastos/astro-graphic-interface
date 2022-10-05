import { Box, Toolbar, IconButton, AppBar } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

export default function ConfigViewTemplate ({ children }) {
    const router = useHistory();

    const handleBack = () => router.replace('/config');

    return <Box>
        <AppBar color={'transparent'} elevation={0}>
            <Toolbar>
                <IconButton size='large' onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
        <main>
            {children}
        </main>
    </Box>
}
