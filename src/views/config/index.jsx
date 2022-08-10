import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import WifiConfigView from './WifiConfigView';
import UsersConfigView from './UsersConfigView';

export default function ConfigView () {
    const { path } = useRouteMatch();

    return <Switch>
        <Route exact path={`${path}/wifi`}>
            <WifiConfigView />
        </Route>
        <Route exact path={`${path}/users`}>
            <UsersConfigView />
        </Route>
    </Switch>
}