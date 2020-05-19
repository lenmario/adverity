import React, { useState, useEffect } from 'react';
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
import _ from 'lodash';

const style = styler([
    { key: "Clicks", color: "#2ca02c" },
    { key: "Impressions", color: "#9467bd" },
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

function AdvGraph(props) {

    const [timerange, setTimerange] = useState(null);
    const [clicksSeries, setClicksSeries] = useState(null);
    const [impressionsSeries, setImpressionsSeries] = useState(null);

    useEffect(() => {
        const clicksSeries = createTimeSeries(props.data, 'Clicks');
        const impressionsSeries = createTimeSeries(props.data, 'Impressions');

        setClicksSeries(clicksSeries);
        setImpressionsSeries(impressionsSeries);
        setTimerange(clicksSeries.timerange());
    }, []);

    if (!timerange || !clicksSeries || !impressionsSeries) {
        return <p>Loading ...</p>;
    }

    return (
        <div>
            <Resizable>
                <ChartContainer
                    title=""
                    timeRange={timerange}
                    format="%d.%m.'%y"
                    // padding={20}
                    enableDragZoom
                    onTimeRangeChanged={(t) => setTimerange(t)}
                // timeAxisTickCount={5}
                >
                    <ChartRow height="300">
                        <YAxis
                            id="clicks"
                            label="Clicks"
                            // labelOffset={-5}
                            min={clicksSeries.min('Clicks')}
                            max={clicksSeries.max('Clicks')}
                            width="60"
                            // showGrid
                            // hideAxisLine
                            transition={300}
                            // format=",.0f"
                            type="linear"
                        />
                        <Charts>
                            <LineChart
                                // key="clicks"
                                axis="clicks"
                                columns={['Clicks']}
                                style={style}
                                series={clicksSeries}
                                interpolation="curveBasis"
                            />
                            <LineChart
                                // key="impressions"
                                axis="impressions"
                                columns={['Impressions']}
                                style={style}
                                series={impressionsSeries}
                                interpolation="curveBasis"
                            />
                        </Charts>
                        <YAxis
                            id="impressions"
                            label="Impressions"
                            // labelOffset={15}
                            min={impressionsSeries.min('Impressions')}
                            max={impressionsSeries.max('Impressions')}
                            width="60"
                            transition={300}
                            // format=",.0f"
                            type="linear"
                        />
                    </ChartRow>
                </ChartContainer>
            </Resizable>
            <Legend
                type="line"
                style={style}
                categories={legend}
            />
        </div>
    );

}

function createTimeSeries(data, name) {
    if (!data || !name || !name.length || name.length === 0) {
        return null;
    }

    let pointsGroupedByDate = _(data)
        .map(item => ({
            time: getDateTime(item.Date),
            [name]: normalizeNumber(item[name])
        }))
        .groupBy('time')
        .mapValues(item => _.sumBy(item, name))
        .toPairs()
        .value()
        ;

    return new TimeSeries({
        name: name,
        columns: ['time', name],
        points: pointsGroupedByDate
    });
}

/**
 * Converts string date to UTC
 * @param {*} dateString date in format DD.MM.YYYY
 * @returns UTC date time or null (also for invalid input)
 */
function getDateTime(dateString) {
    if (!dateString || dateString == null || !dateString.length || dateString.length != 10) {
        return null;
    }

    dateString = dateString.split(' ').join(); // trim off eventual spaces

    const dateArr = dateString.split('.');

    if (dateArr.length !== 3) {
        return null;
    }

    return new Date(dateArr[2], (dateArr[1] - 1), dateArr[0]).getTime();
}

/**
 * Normalizes numeric string
 * @param {*} str numeric string 
 * @returns number; for non numeric strings returns 0
 */
function normalizeNumber(str) {
    if (typeof str === 'undefined' || str == null) {
        return 0;
    }
    const num = parseInt(str);
    if (isNaN(num)) {
        return 0;
    }

    return num;
}

// Export example
export default AdvGraph;