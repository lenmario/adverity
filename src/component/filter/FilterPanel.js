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

    function onApply() {
        alert('Not implemented, I guess from UX perspective this button is ambigous :-) I also skipped the icons, not sure what is the spec for them.');
    }

}

export default FilterPanel;