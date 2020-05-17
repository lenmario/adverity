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


const styleClicks = {
    value: {
        stroke: "#a02c2c",
        opacity: 0.2
    }
};
const styleImpressions = {
    value: {
        stroke: "#FF5733",
        opacity: 0.2
    }
};

class AdvGraph extends React.Component {
    state = {
    };

    render() {

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

        return (
            <Resizable>
                <ChartContainer
                    title=""
                    titleStyle={{ fill: "#555", fontWeight: 500 }}
                    timeRange={clicksSeries.timerange()}
                    format="%b '%y"
                    timeAxisTickCount={5}
                >
                    <ChartRow height="150">
                        <YAxis
                            id="clicks"
                            label="Clicks"
                            min={clicksSeries.min()}
                            max={clicksSeries.max()}
                            width="60"
                        />
                        <YAxis
                            id="impressions"
                            label="Impressions"
                            min={impressionsSeries.min()}
                            max={impressionsSeries.max()}
                            width="60"
                        />
                        <Charts>
                        <LineChart axis="clicks" series={clicksSeries} style={styleClicks} />
                        <LineChart axis="impressions" series={impressionsSeries} style={styleImpressions} />
                        </Charts>
                    </ChartRow>
                </ChartContainer>
            </Resizable>
        );
    }

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