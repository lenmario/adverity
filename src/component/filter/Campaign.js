import React, { useState, useEffect } from 'react';
import FormPanel from '../FormPanel';
import Select from 'react-select';
import MenuList from '../MenuList';

export const OPTION_CAMPAIGNS_ALL = '<All Campaigns>';

function Campaign(props) {

    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);

    // initial load
    useEffect(() => {
        const options = props.selectItems ? props.selectItems.sort().map(item => ({ value: item, label: item })) : [];
        const allCampaigns = {value: null, label: OPTION_CAMPAIGNS_ALL};        
        setOptions([allCampaigns, ...options]);
        setSelectedValue(allCampaigns);
    }, []);  

    return (
        <div className="filterSection">
            <FormPanel formLabel="Campaign" />
            <Select 
                components={{ MenuList }} 
                options={options} 
                placeholder={OPTION_CAMPAIGNS_ALL}
                value={selectedValue}
                onChange={(campaign) => {
                    props.onCampaignChange(campaign);
                    setSelectedValue(campaign);
                }}
                />
        </div>
    );
}

export default Campaign;