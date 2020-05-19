import React, { } from 'react';
import GraphLabel from './GraphLabel';
import AdvGraph from './AdvGraph';

function ChartPanel(props) {
    return (
        <div className="chartPanel">
            <GraphLabel datasources={props.datasources} campaign={props.campaign} />
            <AdvGraph data={props.data} />
        </div>
    );
}

export default ChartPanel;