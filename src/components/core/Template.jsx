import React from 'react';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main
    }
}));

export default function Template({ children }) {
    const classes = useStyles();
    return <div className={classes.root}>
        {children}
    </div>
}