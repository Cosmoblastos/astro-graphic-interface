import React, { useEffect, useState } from 'react';
import { Box, Backdrop, CircularProgress, Container, Modal, DialogContent, DialogTitle, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography, TextField, Button, Dialog, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';

import SignalWifi0BarIcon from '@mui/icons-material/SignalWifi0Bar';
import NetworkWifi1BarIcon from '@mui/icons-material/NetworkWifi1Bar';
import NetworkWifi2BarIcon from '@mui/icons-material/NetworkWifi2Bar';
import NetworkWifi3BarIcon from '@mui/icons-material/NetworkWifi3Bar';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import { useCallback } from 'react';
import {WhiteBGTextField} from "../../components/UI/inputs";
import LoadingView from "../Loading";

const getNetworks = gql`
    query getNetworks {
        networks {
            ssid
            bssid
            mac
            channel
            frequency
            signal_level
            quality
            security
            security_flags
            mode
        }
    }
`;

const setNetworkMutation = gql`
    mutation setNetwork ($network: NetworkInput!, $password: String!) {
        setNetwork(network: $network, password: $password)
    }
`;

const useStyles = makeStyles((theme) => ({
    wifiContainer: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    wifiFloatingBox: {
        width: '45%',
        height: '55vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        border: '2px solid #fff',
        borderRadius: '20px',
        padding: 0
    }
}));

const useSignalStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(6, 8),
        cursor: 'pointer',
        // '&:hover': {
        //     backgroundColor: 'rgba(255, 255, 255, 0.3)'
        // }
    }
}));

function SignalQualityIcon ({ quality }) {
    if (quality < 10) return <SignalWifi0BarIcon color='inherit'/>
    if (quality >= 10 && quality < 25) return <NetworkWifi1BarIcon color='inherit'/>
    if (quality >= 25 && quality < 40) return <NetworkWifi2BarIcon color='inherit'/>
    if (quality >= 40 && quality < 60) return <NetworkWifi3BarIcon color='inherit'/>
    if (quality >= 60 && quality < 80) return <NetworkWifiIcon color='inherit'/>
    if (quality >= 80) return <SignalWifiStatusbar4BarIcon color='inherit'/>
}

function WifiNetwork ({ data, onSelect }) {
    const classes = useSignalStyles();
    return <ListItem className={classes.root} button onClick={() => onSelect(data)}>
        <ListItemText>
            {data?.ssid || 'No name available'}
        </ListItemText>
        <ListItemIcon sx={{ color: '#fff' }}>
            <SignalQualityIcon quality={data.quality} />
        </ListItemIcon>
    </ListItem>
}

const useWifiDialogStyles = makeStyles((theme) => ({
    dialogRoot: {
        width: '50%'
    }
}));

function WifiPasswordDialog ({ selectedNetwork, resetNetwork }) {
    const [setNetwork, { data, error, loading }] = useMutation(setNetworkMutation),
        [networkPassword, setNetworkPassword] = useState(''),
        classes = useWifiDialogStyles();

    const handleFormSubmit = useCallback(async (e) => {
        e.preventDefault();
        delete selectedNetwork.__typedef;
        await setNetwork({ variables: {
            network: selectedNetwork,
            password: networkPassword
         } });
    }, [networkPassword, selectedNetwork]);

    return <Dialog open={Boolean(selectedNetwork)} onClose={resetNetwork} classes={{
        paper: classes.dialogRoot
    }}>
        <DialogContent>
            <form onSubmit={handleFormSubmit}>
                <Grid container alignItems={'center'} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant={'h4'} color={'primary'} align={'center'}>
                            Enter the password
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign={'center'}>
                            <Typography variant={'caption'} align={'center'} color={'primary'}>network:</Typography>
                            <Typography variant={'h6'} gutterBottom color={'primary'} align={'center'}>
                                {selectedNetwork?.ssid}
                            </Typography>
                        </Box>
                    </Grid>
                    {
                        error && <Grid item xs={12}>
                            <Typography color={'error'}>
                                {error?.toString()}
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <WhiteBGTextField
                            type={'password'}
                            name={'networkPassword'}
                            label={'Password'}
                            variant={'outlined'}
                            color={'primary'}
                            required
                            value={networkPassword}
                            onChange={(e) => setNetworkPassword(e.target.value)}
                            fullWidth
                        />
                        <br /><br />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant={'contained'} color={'primary'} 
                            fullWidth type={'submit'}
                            disableElevation
                            disabled={loading}
                            startIcon={loading ? <CircularProgress /> : null}
                        >
                            Connect
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant={'contained'} color={'secondary'}
                            fullWidth onClick={resetNetwork}
                            disableElevation
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </DialogContent>
    </Dialog>
}

export default function WifiConfigView () {
    const { data, error, loading } = useQuery(getNetworks),
        classes = useStyles(),
        [selectedNetwork, setSelectedNetwork] = useState(null);

    if (loading) return <LoadingView message={'Loading...'}/>

    return <Box className={classes.wifiContainer}>
        <Typography variant={'h4'} gutterBottom>
            Select a WIFI network
        </Typography>
        <br />
        {
            data?.networks?.length && <Box className={classes.wifiFloatingBox}>
                <List sx={{ padding: 0 }}>
                    {
                        data.networks.map((network, index) => (
                            <div key={`${index}-${network.ssid}`}>
                                <WifiNetwork data={network} onSelect={(net) => setSelectedNetwork(net)}/>
                                <Divider color={'#fff'} />
                            </div>
                        ))
                    }
                </List>
            </Box>
        }
        <WifiPasswordDialog 
            selectedNetwork={selectedNetwork} 
            resetNetwork={() => setSelectedNetwork(null)}
        />
    </Box>
}