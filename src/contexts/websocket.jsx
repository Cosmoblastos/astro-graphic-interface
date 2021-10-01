import React, {
    useCallback,
    useEffect,
    useContext,
    useMemo,
    useState,
    useRef
} from "react";
import socketIOClient from "socket.io-client";

const baseUrl = "http://localhost:65000";
const socket = socketIOClient(baseUrl, { transports: ['websocket', 'polling', 'flashsocket'] });

const channels = {
    videoStreaming: 'videoStreaming',
    voiceDetected: 'voiceDetected',
    voiceCommand: 'voiceCommand',
    faceRecognition: 'faceRecognition',
    faceIdentification: 'faceIdentification',
    playVideo: 'playVideo'
}

const WebsocketContext = React.createContext();

const WebsocketProvider = ({ ...rest }) => {

    const [voiceDetected, setVoiceDetected] = useState(false),
        [voiceCommand, setVoiceCommand] = useState(''),
        [img, setImg] = useState(null),
        [isRecording, setIsRecording] = useState(false),
        [playVideoCommand, setPlayVideoCommand] = useState(null);

    useEffect(() => {
        socket.on(channels.voiceCommand, data => {
            console.log("Data: ", data);
            setVoiceCommand(data);
        });

        socket.on(channels.voiceDetected, data => {
            console.log("Data: ", data);
            setVoiceDetected(data);
        });

        socket.on(channels.videoStreaming, data => {
            console.log("Video Streaming", data);
            setImg(data);
        });

        socket.on(channels.faceRecognition, data => {
            console.log("Face recognition", data);
            setIsRecording(true);
        });

        socket.on(channels.faceIdentification, data => {
            console.log("Face identificación", data);
            setIsRecording(false);
        });

        socket.on(channels.playVideo, data => {
            console.log("Play video", data);
            setPlayVideoCommand(data);
        });

        return () => {
            socket.off(channels.voiceCommand);
            socket.off(channels.voiceDetected);
            socket.off(channels.videoStreaming);
            socket.off(channels.faceIdentification);
            socket.off(channels.faceRecognition);
            socket.off(channels.playVideo);
        }
    }, [setVoiceCommand, setImg]);

    const value = {
        voiceCommand,
        setVoiceCommand,
        voiceDetected,
        setVoiceDetected,
        img,
        setImg,
        setIsRecording,
        isRecording,
        playVideoCommand,
        setPlayVideoCommand
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