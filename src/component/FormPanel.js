import React, { Component } from 'react';

class FormPanel extends Component {
    render() {
        return (
            <div className="formPanel">
                <div className="formLabel">{this.props.formLabel}</div>
                <img className="formIcon" src="https://img.icons8.com/windows/16/000000/first-quarter.png"/>
                <img className="formIcon" src="https://img.icons8.com/windows/16/000000/refresh.png"/>
            </div>
        );
    }
}

export default FormPanel;