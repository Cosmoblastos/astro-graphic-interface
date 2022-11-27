import React, { useContext } from 'react';
import {makeStyles} from "@mui/styles";
import EventContext from './EventContext';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100vh',
        backgroundColor: theme.palette.primary.main
    }
}));

export default function Template({ children }) {
    const classes = useStyles(),
        { setOpenDrawer } = useContext(EventContext);

    const toggleMenu = () => {
        setOpenDrawer(true);
    };

    return <div className={classes.root}>
        {children}
    </div>
}