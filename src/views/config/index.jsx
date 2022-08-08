import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import WifiConfigView from './wifiConfigView';

export default function ConfigView () {
    const { path } = useRouteMatch();

    return <Switch>
        <Route exact path={`${path}/wifi`}>
            <WifiConfigView />
        </Route>
    </Switch>
}