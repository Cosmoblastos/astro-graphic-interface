import React from 'react';
import './VideoStreaming.css';

const VideoStreaming = ({img}) =>{

    return (
        <div>
            <img
                src={`data:image/jpg;base64, ${img}`}
            />
        </div>
    );
};

export default VideoStreaming;