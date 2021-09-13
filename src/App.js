import "./App.css";
import MainView from "./views/MainView/MainView";
import { RadarView } from "./views/RadarView";
import { FaceView } from "./views/FaceView";
import { WebsocketProvider } from "./contexts/websocket";

function App() {
  return (
    <WebsocketProvider>
      <div className="App">
        <header className="App-header">
          {/*<MainView />*/}
          {/*<RadarView />*/}
          <FaceView />
        </header>
      </div>
    </WebsocketProvider>
  );
}

export default App;
