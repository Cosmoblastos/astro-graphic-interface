import React, {useCallback, useEffect, useState} from 'react';
import {useSubscription} from "@apollo/client";
import {COMMANDS_SUBSCRIPTION} from "./components/gql/face";
import EventContext from "./components/core/EventContext";
import {useHistory} from "react-router-dom";
import Template from "./components/core/Template";

function EventHandlerLayer ({ children }) {
    const voiceEventSub = useSubscription(COMMANDS_SUBSCRIPTION),
        router = useHistory(),
        [executedCommand, setExecutedCommand] = useState(null),
        [payload, setPayload] = useState(null),
        [playing, setPlaying] = useState(false);


    const handleVoiceEvent = useCallback((eventName, data = null) => {
        //setExecutedCommand(eventName);
        //setPayload(data); //always update the payload.

        switch (eventName) {
            case 'listen':
                //Show face view and set face to listening mode
                router.replace('/');
                break;
            case 'show_view':
                if (!data) {
                    console.warn('Invalid path provided to show_view command');
                    return;
                }
                router.replace(data);
                break;
            case 'show_webpage':
                router.push({ pathname: '/webpage', state: { payload: data } });
                break;
            case 'show_video':
                if (!data) return;
                router.push({ pathname: '/video', state: { payload: data } });
                break;
            case 'show_image':
                if (!data) return;
                router.push({ pathname: '/image', state: { payload: data } });
                break;
            case 'metrics':
                // setShowMetrics(true);
                // let frequencyInterval = setInterval(() => {
                //     setFrequency(randomNumber(80, 90))
                // }, 1000);
                // let oximeterInterval = setInterval(() => {
                //     setOximeter(randomNumber(90, 100))
                // }, 1000);
                // setTimeout(() => {
                //     clearInterval(frequencyInterval);
                //     clearInterval(oximeterInterval);
                //     setTimeout(() => {
                //         setShowMetrics(false);
                //     }, 3000);
                // }, 8000);
                router.push({ pathname: 'metrics' });
                break;
            case 'temperature':
                // setShowTemperature(true);
                // let temperatureInterval = setInterval(() => {
                //     setTemperature(randomNumber(35, 36.9))
                // }, 1000);
                // setTimeout(() => {
                //     clearInterval(temperatureInterval);
                //     setTimeout(() => {
                //         setShowTemperature(false);
                //     }, 3000);
                // }, 8000);
                break;
            case 'emergencia':
                //cara de atención
                //poner video de emergencia
                // listen();
                // setTimeout(() => {
                //     setShowVideo(true);
                // }, 1000);
                break;
            default:
                console.log('Invalid voice command');
                return
        }
    }, [router]);

    useEffect(() => {
        if (voiceEventSub?.loading) return;
        if (voiceEventSub?.error) {
            console.error('--- VOICE EVENT ERROR ---', voiceEventSub?.error);
            return;
        }
        if (!voiceEventSub?.data) return;

        const eventData = voiceEventSub.data?.voiceEvents;
        console.log('--- VOICE EVENT ---', eventData);
        if (!eventData?.type) {
            console.warn('Null voice event name received');
            return;
        }

        handleVoiceEvent(eventData?.type, eventData?.payload);
    }, [voiceEventSub, handleVoiceEvent]);

    return <EventContext.Provider value={{
        executedCommand,
        payload,
        playing, setPlaying
    }}>
        <Template>
            {children}
        </Template>
    </EventContext.Provider>
}

export default EventHandlerLayer;