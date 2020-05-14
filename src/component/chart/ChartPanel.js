import React, { Component } from 'react';
import GraphLabel from './GraphLabel';
import AdvGraph from './AdvGraph';

class ChartPanel extends Component {
    render() {
        return (
            <div className="chartPanel">
                <GraphLabel />
                <AdvGraph />
            </div>
        );
    }
}

export default ChartPanel;