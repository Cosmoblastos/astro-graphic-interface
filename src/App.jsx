import "./App.css";
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
})

function App() {
    return <div className={'App'}>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <EventHandlerLayer>
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
                    </Switch>
                </EventHandlerLayer>
            </ApolloProvider>
        </BrowserRouter>
    </div>
}

export default App;
