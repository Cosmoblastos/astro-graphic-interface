import React, {useState} from 'react';

import './styles.css';

export default function MetricsView () {
    const [frequency, setFrequency] = useState(0),
        [oxygenation, setOxygenation] = useState(0);

    return <div className="metrics">
        <div className="metric frequency">
            {frequency} <span className="metric_name">FC</span>
        </div>
        <div className="metric oxygenation">
            {oxygenation} <span className="metric_name">SpO2</span>
        </div>
    </div>
}