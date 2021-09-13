import "./App.css";
import { SerialPortProvider } from "./contexts/serialport";
import MainView from "./views/MainView/MainView";
import { RadarView } from "./views/RadarView";
import { FaceView } from "./views/FaceView";

function App() {
  return (
    <SerialPortProvider>
      <div className="App">
        <header className="App-header">
          {/*<MainView />*/}
          {/*<RadarView />*/}
          <FaceView />
        </header>
      </div>
    </SerialPortProvider>
  );
}

export default App;
