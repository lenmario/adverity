import React, { } from 'react';

function FormPanel(props) {
    return (
        <div className="formPanel">
            <div className="formLabel">{props.formLabel}</div>
            <img className="formIcon" src="https://img.icons8.com/windows/16/000000/first-quarter.png" />
            <img className="formIcon" src="https://img.icons8.com/windows/16/000000/refresh.png" />
        </div>
    );
}

export default FormPanel;