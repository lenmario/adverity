import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import FilterPanel from './component/filter/FilterPanel';
import ChartPanel from './component/chart/ChartPanel';
import * as d3 from 'd3';
import _ from 'lodash';
import { OPTION_CAMPAIGNS_ALL } from './component/filter/Campaign';
import DataSource from './component/filter/DataSource';

function App(props) {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectItems, setSelectItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDatasources, setSelectedDatasources] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState([]);

  // initial load of data 
  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const data = await d3.csv("/adverity.csv");

      const selectItems = {
        datasources: getUniqueItems(data, 'Datasource'),
        campaigns: getUniqueItems(data, 'Campaign'),
      };

      setSelectItems(selectItems);
      setData(data);
      setFilteredData(data);
      setIsLoading(false);
    }

    fetchData().catch(error => setError(error));
  }, []);

  // handling of filters (datasources, campaign)
  useEffect(() => {

    console.log('--------------- Filter changed! --------------');
    console.log(selectedCampaign);
    console.log(selectedDatasources);


    // TODO !!!!!
    console.log('--------------- Data --------------');
    console.log(data);

    const datasources = selectedDatasources && selectedDatasources.length ?
      selectedDatasources.map(ds => ds.value) : [];

    const campaigns = selectedCampaign && selectedCampaign.value ?
      [selectedCampaign.value] : [];

    console.log('--------------- datasources --------------');
    console.log(datasources);
    console.log('--------------- campaigns --------------');
    console.log(campaigns);

    // const result = _(data)
    //   // .intersectionBy(campaigns, 'Campaign')
    //   .intersectionBy(datasources, 'Datasource')
    //   .value()
    //   ;

    // const result = _.intersectionBy(data, datasources, 'Datasource').values();

    const result = data.filter(d => 
      (!datasources.length || datasources.includes(d.Datasource)) 
      && (!campaigns.length || campaigns.includes(d.Campaign))
      );

    console.log('--------------- result --------------');
    console.log(result);

    setFilteredData(result);

  }, [selectedDatasources, selectedCampaign]);

  return (
    <div>
      {error && <p>{error.message}</p>}
      {isLoading ? (<p>Loading ...</p>) :
        (<div className="App">
          <FilterPanel
            selectItems={selectItems}
            onDatasourcesChange={(ds) => { setSelectedDatasources(ds) }}
            onCampaignChange={(c) => { setSelectedCampaign(c) }}
          />
          <ChartPanel data={filteredData} />
        </div>)
      }
    </div>
  )

}

function getUniqueItems(data, name) {
  if (!data) {
    return [];
  }
  return data.map(item => item[name]).filter((x, i, a) => a.indexOf(x) === i)
}


export default App;
