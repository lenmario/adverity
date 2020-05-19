import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import FilterPanel from './component/filter/FilterPanel';
import ChartPanel from './component/chart/ChartPanel';
import * as d3 from 'd3';

function App(props) {

  const [data, setData] = useState([]);
  const [selectItems, setSelectItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const data = await d3.csv("/adverity.csv");
      setData(data);

      const selectItems = {
        datasources: getUniqueItems(data, 'Datasource'),
        campaigns: getUniqueItems(data, 'Campaign'),
      };
      setSelectItems(selectItems);

      setIsLoading(false);
    }

    fetchData().catch(error => setError(error));
  }, []);

  return (
    <div>
      {error && <p>{error.message}</p>}
      {isLoading ? (<p>Loading ...</p>) :
        (<div className="App">
          <FilterPanel selectItems={selectItems} />
          <ChartPanel data={data} />
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
