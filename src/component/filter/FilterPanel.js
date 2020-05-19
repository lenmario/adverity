import React, { } from 'react';
import DataSource from './DataSource';
import Campaign from './Campaign';

function FilterPanel(props) {

    return (
        <div className="filterPanel">
            <div className="banner">Filter dimension values</div>
            <div className="filterColumns">
                <div className="filterColumnSections">
                    <DataSource selectItems={props.selectItems.datasources} />
                    <Campaign selectItems={props.selectItems.campaigns} />
                </div>
                <div className="filterColumnButtons">
                    <button className="filterButton" onClick={() => { onApply() }} >Apply</button>
                </div>
            </div>
        </div>
    );

    function onApply() {
        alert('blaaah');
    }

}

export default FilterPanel;