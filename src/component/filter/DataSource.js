import React, { } from 'react';
import FormPanel from '../FormPanel';
import Select from 'react-select';
import MenuList from '../MenuList';

function DataSource(props) {

    if (!props.selectItems) {
        return <div />;
    }

    const options = props.selectItems ? props.selectItems.sort().map(item => ({ value: item, label: item })) : [];

    return (
        <div className="filterSection">
            <FormPanel formLabel="Datasource" />
            <Select isMulti={true}
                components={{ MenuList }}
                options={options} />
        </div>
    );
}

export default DataSource;