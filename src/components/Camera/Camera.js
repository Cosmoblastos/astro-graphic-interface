import React, { useState, useEffect } from 'react';
import './Camera.css';

const Camera = ({ className = '', url = null }) => {

    return (
        <iframe
            src={url}
            className="camera"
        />
    );
};

export default Camera;