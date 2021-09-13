import React, {
    useCallback,
    useEffect,
    useContext,
    useMemo,
    useState,
    useRef
} from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

const baseUrl = "http://localhost:65000";
const socket = socketIOClient(baseUrl, { transports: ['websocket', 'polling', 'flashsocket'] });

const channels = {
    image: 'image',
    voiceDetected: 'voiceDetected',
    voiceCommand: 'voiceCommand',
}

const WebsocketContext = React.createContext();

const WebsocketProvider = ({ ...rest }) => {

    const [voiceDetected, setVoiceDetected] = useState(false),
        [voiceCommand, setVoiceCommand] = useState('');

    useEffect(() => {
        socket.on(channels.voiceCommand, data => {
            console.log("Data: ", data);
            setVoiceCommand(data);
        });

        socket.on(channels.voiceDetected, data => {
            console.log("Data: ", data);
            setVoiceDetected(data);
        });

        return () => {
            socket.off(channels.voiceCommand);
            socket.off(channels.voiceDetected);
        }
    }, [setVoiceCommand]);

    const value = {
        voiceCommand,
        setVoiceCommand,
        voiceDetected,
        setVoiceDetected,
    };

    return <WebsocketContext.Provider value={value} {...rest} />;

};

const useWebsocket = () => {
    const context = useContext(WebsocketContext);

    if (!context) {
        throw new Error("useWebsocket must be inside its provider");
    }

    return context;
}

export { useWebsocket, WebsocketProvider };