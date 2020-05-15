import React, { Component } from 'react';
import FormPanel from '../FormPanel';
import Select from 'react-select';
import MenuList from '../MenuList';

class Campaign extends Component {
    render() {

        if (!this.props.selectItems) {
            return <div/>;
        }

        const options = this.props.selectItems.sort().map(item => ({value: item, label: item}));

        return (
            <div className="filterSection">
                <FormPanel formLabel="Campaign" />
                <Select components={{MenuList}} options={options} />
            </div>
        );
    }
}

export default Campaign;