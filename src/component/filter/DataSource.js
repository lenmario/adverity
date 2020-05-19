import React, { useState, useEffect } from 'react';
import FormPanel from '../FormPanel';
import Select from 'react-select';
import MenuList from '../MenuList';

function DataSource(props) {

    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);

    // initial load
    useEffect(() => {
        const options = props.selectItems ? props.selectItems.sort().map(item => ({ value: item, label: item })) : [];
        setOptions(options);
    }, []);  

    return (
        <div className="filterSection">
            <FormPanel formLabel="Datasource" />
            <Select 
                isMulti={true}
                components={{ MenuList }}
                options={options} 
                value={selectedValue}
                onChange={(datasources) => {
                    props.onDatasourcesChange(datasources);
                    setSelectedValue(datasources);
                }}
                />
        </div>
    );
}

export default DataSource;