import React, { } from 'react';
import DataSource from './DataSource';
import Campaign from './Campaign';

function FilterPanel(props) {

    return (
        <div className="filterPanel">
            <div className="banner">Filter dimension values</div>
            <div className="filterColumns">
                <div className="filterColumnSections">
                    <DataSource 
                        selectItems={props.selectItems.datasources} 
                        onDatasourcesChange={props.onDatasourcesChange} 
                        />
                    <Campaign 
                        selectItems={props.selectItems.campaigns} 
                        onCampaignChange={props.onCampaignChange}
                        />
                </div>
                <div className="filterColumnButtons">
                    <button className="filterButton" onClick={() => { onApply() }} >Apply</button>
                </div>
            </div>
        </div>
    );

}

const onApply = () => {
    alert('Not implemented, button is ambigous. Also the icons are there just to show the mockup.');
}


export default FilterPanel;