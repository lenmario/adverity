import React, { } from 'react';
import FormPanel from '../FormPanel';
import Select from 'react-select';
import MenuList from '../MenuList';

function Campaign(props) {

    const options = props.selectItems ? props.selectItems.sort().map(item => ({ value: item, label: item })) : [];

    return (
        <div className="filterSection">
            <FormPanel formLabel="Campaign" />
            <Select components={{ MenuList }} options={options} />
        </div>
    );
}

export default Campaign;