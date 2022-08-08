import React from 'react';
import { TextField } from "@mui/material";
import { styled } from '@mui/styles';

export const WhiteBGTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover': {
            borderColor: theme.palette.primary.main,
        }
    },
    '& .MuiInputBase-input': {
        color: theme.palette.primary.main,
        '&::placeholder': {
            color: theme.palette.primary.main
        }
    }
}));

export default {
    WhiteBGTextField
}