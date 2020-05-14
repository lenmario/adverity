<ChartContainer timeRange={series.range()} format="%b '%y">
        <ChartRow height="150">
            <YAxis
                id="price"
                label="Price ($)"
                min={series.min()} max={series.max()}
                width="60" format="$,.2f"/>
            <Charts>
                <LineChart axis="price" series={series} style={style}/>
                <Baseline axis="price" style={baselineStyleLite} value={series.max()} label="Max" position="right"/>
                <Baseline axis="price" style={baselineStyleLite} value={series.min()} label="Min" position="right"/>
                <Baseline axis="price" style={baselineStyleLite} value={series.avg() - series.stdev()}/>
                <Baseline axis="price" style={baselineStyleLite} value={series.avg() + series.stdev()}/>
                <Baseline axis="price" style={baselineStyle} value={series.avg()} label="Avg"/>
            </Charts>
        </ChartRow>
    </ChartContainer>
    