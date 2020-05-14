import React, { Component } from 'react';
import FormPanel from '../FormPanel';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class DataSource extends Component {
    render() {
        return (
            <div className="filterSection">
                <FormPanel formLabel="Datasource" />
                <Select isMulti={true} options={options} />
            </div>
        );
    }
}

export default DataSource;