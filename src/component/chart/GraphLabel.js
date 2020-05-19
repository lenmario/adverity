import React, { } from 'react';

function GraphLabel(props) {
    
    return (
        <div>
            <div className="banner">Datasource: {getArrayItemsToString(props.datasources)}; Campaign: {getArrayItemsToString(props.campaign)}</div>
        </div>
    );

}

const getArrayItemsToString = (items) => {
    if (!items || !items.length) {
        return '<All>';
    }  
    return items.map(i => '\"' + i + '\"').join(', ');
};

export default GraphLabel;