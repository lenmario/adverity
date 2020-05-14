import React, { Component } from 'react';
import GraphLabel from './GraphLabel';
import baselines from './Graph';

class ChartPanel extends Component {
    render() {
        return (
            <div className="chartPanel">
                <GraphLabel />
                <baselines />
            </div>
        );
    }
}

export default ChartPanel;