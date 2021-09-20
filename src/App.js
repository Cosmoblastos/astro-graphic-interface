import "./App.css";
import MainView from "./views/MainView/MainView";
import { RadarView } from "./views/RadarView";
import { FaceView } from "./views/FaceView";
import { WebsocketProvider } from "./contexts/websocket";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {Videos} from "./views/Videos";

function App() {
  return (
    <Router>
        <WebsocketProvider>
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
                    {/*<MainView />*/}
                    {/*<RadarView />*/}
                </header>
            </div>
        </WebsocketProvider>
    </Router>
  );
}

export default App;
