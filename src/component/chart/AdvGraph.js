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
    Resizable,
    styler,
    Legend
} from 'react-timeseries-charts';
import { timer } from 'd3';


const style = styler([
    { key: "Clicks", color: "#2ca02c"},
    { key: "Impressions", color: "#9467bd"},
]);

const legend = [
    {
        key: "Clicks",
        label: "Clicks",
        disabled: false
    },
    {
        key: "Impressions",
        label: "Impressions",
        disabled: false
    }
];

class AdvGraph extends React.Component {
    state = {
        timerange: null,
        clicksSeries: null,
        impressionsSeries: null,
    };

    componentDidMount() {
        const clicksPoints = this.props.data.map(c => [AdvGraph.getDateTime(c.Date), AdvGraph.normalizeNumber(c.Clicks)]);
        const impressionsPoints = this.props.data.map(c => [AdvGraph.getDateTime(c.Date), AdvGraph.normalizeNumber(c.Impressions)]);

        const clicksSeries = new TimeSeries({
            name: "Clicks",
            columns: ["time", "value"],
            points: clicksPoints
        });

        const impressionsSeries = new TimeSeries({
            name: "Impressions",
            columns: ["time", "value"],
            points: impressionsPoints
        });

        this.setState({timerange: clicksSeries.timerange(), clicksSeries, impressionsSeries});
    }

    render() {

        const { timerange, clicksSeries, impressionsSeries } = this.state;

        if (!timerange || !clicksSeries || !impressionsSeries) {
            return <p>Loading ...</p>;
        }

        return (
            <Resizable>
                <div>
                <ChartContainer
                    title=""
                    timeRange={timerange}
                    format="%b '%y"
                    // padding={20}
                    enableDragZoom
                    onTimeRangeChanged={this.handleTimeRangeChange}
                    // timeAxisTickCount={5}
                >
                    <ChartRow height="500">
                        <YAxis
                            id="clicks"
                            label="Clicks"
                            labelOffset={-10}
                            min={clicksSeries.min()}
                            max={clicksSeries.max()}
                            width="60"
                            // showGrid
                            // hideAxisLine
                            transition={300}
                            format=",.0f"
                            type="linear"
                        />
                        <Charts>
                            <LineChart 
                                key="Clicks" 
                                axis="clicks" 
                                // columns={["Clicks"]} 
                                // style={style}
                                series={clicksSeries} 
                                interpolation="curveBasis"
                            />
                            <LineChart 
                                key="Impressions" 
                                axis="impressions" 
                                // columns={["Impressions"]} 
                                // style={style}
                                series={impressionsSeries} 
                                interpolation="curveBasis"
                            />
                        </Charts>
                        <YAxis
                            id="impressions"
                            label="Impressions"
                            labelOffset={12}
                            min={impressionsSeries.min()}
                            max={impressionsSeries.max()}
                            width="60"
                            transition={300}
                            format=",.0f"
                            type="linear"
                        />
                    </ChartRow>
                </ChartContainer>
                <Legend
                    type="line"
                    style={style}
                    categories={legend}
                />
                </div>
            </Resizable>
        );
    }

    handleTimeRangeChange = timerange => {
        this.setState({ timerange });
    };
    
    /**
     * Converts string date to UTC
     * @param {*} dateString date in format DD.MM.YYYY
     * @returns UTC date time or null (also for invalid input)
     */
    static getDateTime(dateString) {
        if (!dateString || dateString == null || !dateString.length || dateString.length != 10) {
            return null;
        }

        dateString = dateString.split(' ').join(); // trim off eventual spaces

        const dateArr = dateString.split('.');

        if (dateArr.length != 3) {
            return null;
        }

        return new Date(dateArr[2], (dateArr[1] - 1), dateArr[0]).getTime();
    }

    /**
     * Normalizes numeric string
     * @param {*} str numeric string 
     * @returns number; for non numeric strings returns 0
     */
    static normalizeNumber(str) {
        if (typeof str === 'undefined' || str == null) {
            return 0;
        }
        const num = parseInt(str);
        if (isNaN(num)) {
            return 0;
        }

        return num;
    }

}

// Export example
export default AdvGraph;