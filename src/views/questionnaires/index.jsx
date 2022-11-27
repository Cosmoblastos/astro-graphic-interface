import { Switch, Route, useRouteMatch } from 'react-router-dom';
import QuestionnairesMenuView from './menu';
import QuestionnaireDetail from './[id]';

export default function QuestionnairesMainView () {
    const { path } = useRouteMatch();

    return <Switch>
        <Route exact path={path}>
            <QuestionnairesMenuView />
        </Route>
        <Route exact path={`${path}/:id`}>
            <QuestionnaireDetail />
        </Route>
    </Switch>
}