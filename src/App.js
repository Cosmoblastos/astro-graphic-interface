import "./App.css";
import MainView from "./views/MainView/MainView";
import { RadarView } from "./views/RadarView";
import { FaceView } from "./views/FaceView";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {Videos} from "./views/Videos";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

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
  return (
    <Router>
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                    <Switch>
                        <Route path={"/"}>
                            <FaceView />
                        </Route>

                        <Route path={"/videos"}>
                            <Videos />
                        </Route>
                    </Switch>
                </header>
            </div>
        </ApolloProvider>
    </Router>
  );
}

export default App;
