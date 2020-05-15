import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import FilterPanel from './component/filter/FilterPanel';
import ChartPanel from './component/chart/ChartPanel';
import * as d3 from 'd3';
import _ from 'lodash';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      selectItems: null,
      error: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    d3.csv("/adverity.csv")
      .then(data => {

        const selectItems = {
          datasources: App.getUniqueItems(data, 'Datasource'),
          campaigns: App.getUniqueItems(data, 'Campaign'),
        };
    
        this.setState({ data, isLoading: false, selectItems});

      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    const { data, selectItems, error, isLoading } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="App">
        <FilterPanel selectItems={selectItems} />
        <ChartPanel />
      </div>
    );
  }

  static getUniqueItems(data, name) {
    if (!data) {
      return [];
    }
    return data.map(item => item[name]).filter((x, i, a) => a.indexOf(x) === i)
  }

}

export default App;
