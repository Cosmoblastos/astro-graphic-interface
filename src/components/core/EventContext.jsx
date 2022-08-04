import React from 'react';

const EventContext = React.createContext({
    executedCommand: null,
    payload: null,
    playing: false
});

export default EventContext;