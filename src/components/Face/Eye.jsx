import React from "react";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'aqua',
        border: 'none',
        borderRadius: '30%',
    }
}));

const Eye = ({
                 width = "100px",
                 height = "100px",
                 margin = "15px",
                 translateX = "0",
                 translateY = "-20px",
                 transition = "all 1s",
             }) => {
    const classes = useStyles();

    return (
        <div
            style={{
                width,
                height,
                margin,
                transform: `translateX(${translateX}) translateY(${translateY})`,
                transition
            }}
            className={classes.root}>
        </div>
    );
};

export default Eye;