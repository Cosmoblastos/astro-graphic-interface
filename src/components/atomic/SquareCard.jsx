import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import {makeStyles} from "@mui/styles";


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

export default function SquareCard ({ icon, label, styles, onClick }) {
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