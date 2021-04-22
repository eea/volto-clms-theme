import React from 'react';
import PropTypes from 'prop-types';


function CclTab(props) {

    let { activeTab, label, onClick } = props;

    function onTabClick() {
        onClick(label);
    }

    let className = 'card';

    if (activeTab === label) {
        className += ' active';
    }

    return (
        <div className={className}>
            <li class="collapsed" onClick={onTabClick}>{label}</li>
            
        </div>
    );

}

CclTab.propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default CclTab;