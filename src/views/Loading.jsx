import React from 'react';
import {Backdrop, CircularProgress, Typography, Box} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: ({ alfa }) => ({
        backgroundColor: `${theme.palette.primary.main} !Important`,
    }),
    spin: {
        width: '100px',
        height: '100px',
    }
}));

export default function LoadingView ({ message, alfa = false }) {
    const classes = useStyles({ alfa });

    return <Backdrop open={true} classes={{ root: classes.backdrop }}>
        <Box>
            <CircularProgress size={'8rem'} style={{ color: '#70DDFF' }} />
            {message && <>
                <br />
                <Typography align={'center'}>{message}</Typography>
            </>}
        </Box>
    </Backdrop>
}