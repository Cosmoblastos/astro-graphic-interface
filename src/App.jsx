import { FaceView } from "./views/face";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import EventHandlerLayer from "./EventHandlerLayer";
import VideoView from "./views/video/VideoView";
import ImageView from "./views/image/ImageView";
import WebPageView from "./views/webpage/WebPageView";
import MetricsView from "./views/metrics/MetricsView";
import ConfigView from "./views/config";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./components/core/Theme";
import {CssBaseline} from "@mui/material";
import SideMenu from './components/core/SideMenu';
import { useContext } from "react";
import EventContext from "./components/core/EventContext";
import { makeStyles } from "@mui/styles";
import QuestionnairesView from "./views/questionnaires";

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000',
    options: {
        reconnect: true
    }
});

const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100vh',
        backgroundColor: theme.palette.primary.main
    }
}));

function AppContent ({ children }) {
    const classes = useStyles();
    const { setOpenDrawer } = useContext(EventContext);

    const toggleDrawer = () => setOpenDrawer(true);

    return <div className={classes.root} onClick={toggleDrawer}>
        {children}
    </div>
}

function App() {
    return <ApolloProvider client={client}>
        <ThemeProvider theme={Theme}>
            <CssBaseline />
            <BrowserRouter>
                <EventHandlerLayer>
                    <AppContent>
                        <Switch>
                            <Route exact path={"/"}>
                                <FaceView />
                            </Route>
                            <Route exact path={'/video'}>
                                <VideoView />
                            </Route>
                            <Route exact path={'/image'}>
                                <ImageView />
                            </Route>
                            <Route exact path={'/webpage'}>
                                <WebPageView />
                            </Route>
                            <Route exact path={'/metrics'}>
                                <MetricsView />
                            </Route>
                            <Route path={'/config'}>
                                <ConfigView />
                            </Route>
                            <Route path={'/questionnaires'}>
                                <QuestionnairesView />
                            </Route>
                        </Switch>
                    </AppContent>
                    <SideMenu />
                </EventHandlerLayer>
            </BrowserRouter>
        </ThemeProvider>
    </ApolloProvider>
}

export default App;
