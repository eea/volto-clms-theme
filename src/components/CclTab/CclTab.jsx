import React from 'react';
import PropTypes from 'prop-types';


function CclTab(props) {

    let { activeTab, tabTitle, onClick } = props;

    function onTabClick() {
        onClick(tabTitle);
    }

    let className = 'card';

    if (activeTab === tabTitle) {
        className += ' active';
    }

    return (
        <div className={className}>
            <li class="collapsed" onClick={onTabClick}>{tabTitle}</li>
        </div>
    );

}

CclTab.propTypes = {
    activeTab: PropTypes.string.isRequired,
    tabTitle: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default CclTab;