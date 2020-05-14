import React, { Component } from 'react';
import DataSource from './DataSource';
import Campaign from './Campaign';

class FilterPanel extends Component {

    onApply() {
        alert('blaaah');
    }

    render() {
        return (
            <div className="filterPanel">
                <div className="banner">Filter dimension values</div>
                <div className="filterColumns">
                    <div className="filterColumnSections">
                        <DataSource />
                        <Campaign />
                    </div>
                    <div className="filterColumnButtons">
                        <button className="filterButton" onClick={() => {this.onApply()}} >Apply</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterPanel;