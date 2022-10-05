import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import WifiConfigView from './WifiConfigView';
import UsersConfigView from './UsersConfigView';
import NewUserConfigView from "./NewUserConfigView";
import ConfigView from './ConfigView';

export default function ConfigIndexView () {
    const { path } = useRouteMatch();

    return <Switch>
        <Route exact path={path}>
            <ConfigView />
        </Route>
        <Route exact path={`${path}/wifi`}>
            <WifiConfigView />
        </Route>
        <Route exact path={`${path}/users`}>
            <UsersConfigView />
        </Route>
        <Route exact path={`${path}/newUser`}>
            <NewUserConfigView />
        </Route>
    </Switch>
}