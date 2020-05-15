import React, { Component } from 'react';
import FormPanel from '../FormPanel';
import Select from 'react-select';
import MenuList from '../MenuList';

class DataSource extends Component {
    render() {

        if (!this.props.selectItems) {
            return <div/>;
        }

        const options = this.props.selectItems.map(item => ({value: item, label: item}));

        return (
            <div className="filterSection">
                <FormPanel formLabel="Datasource" />
                <Select isMulti={true} 
                    components={{MenuList}} 
                    options={options} />
            </div>
        );
    }
}

export default DataSource;