import React, { Component } from 'react';
import { 
    TimeSeries
} from 'pondjs';
import { 
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    Resizable
} from 'react-timeseries-charts';

// Data
const data = require("./usd_vs_euro.json");
const points = data.widget[0].data.reverse();
const series = new TimeSeries({
    name: "USD_vs_EURO",
    columns: ["time", "value"],
    points
});

const style = {
    value: {
        stroke: "#a02c2c",
        opacity: 0.2
    }
};

class AdvGraph extends React.Component {
    state = {
        tracker: null,
        timerange: series.timerange()
    };

    handleTrackerChanged = tracker => {
        this.setState({ tracker });
    };

    handleTimeRangeChange = timerange => {
        this.setState({ timerange });
    };

    render() {
        return (
            <Resizable>
                <ChartContainer
                    title="Euro price (USD)"
                    titleStyle={{ fill: "#555", fontWeight: 500 }}
                    timeRange={series.timerange()}
                    format="%b '%y"
                    timeAxisTickCount={5}
                >
                    <ChartRow height="150">
                        <YAxis
                            id="price"
                            label="Price ($)"
                            min={series.min()}
                            max={series.max()}
                            width="60"
                            format="$,.2f"
                        />
                        <Charts>
                            <LineChart axis="price" series={series} style={style} />
                        </Charts>
                    </ChartRow>
                </ChartContainer>
            </Resizable>
        );
    }
}

// Export example
export default AdvGraph;