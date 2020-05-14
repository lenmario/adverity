import React from 'react';

import logo from './logo.svg';
import './App.css';
import FilterPanel from './component/filter/FilterPanel';
import ChartPanel from './component/chart/ChartPanel';

function App() {
  return (
    <div className="App">
      <FilterPanel />
      <ChartPanel />
    </div>
  );
}

export default App;
