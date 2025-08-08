import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { RenderBlocks } from '@plone/volto/components';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';

import { FontAwesomeIcon } from '@eeacms/volto-clms-utils/components';

import BioGeoPhysicalImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_biogeophysical_green_bg.svg';
import GroundMotionImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_groundmotion_green_bg.svg';
import LandCoverImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_landcover_green_bg.svg';
import PriorityAreaImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_priorityarea_green_bg.svg';
import ReferenceAndValidationImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_referenceandvalidation_green_bg.svg';
import SatelliteImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_satellite_green_bg.svg';

import { ReactSVG } from 'react-svg';

const TabsComponent = (props) => {
  const { tabsList = [], setActiveTab } = props;
  function handleAction(activeTab, tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }
  return (
    <div className="button-group" role="tablist">
      {tabsList.map((tab, index) => {
        const { activeTab = null, tabs = {} } = props;
        const title = tabs[tab].title;
        const tabIndex = index + 1;
        const defaultTitle = `Tab ${tabIndex}`;
        return (
          <span
            key={index}
            id={tabIndex}
            role="tab"
            aria-controls={`tab-${index}`}
            aria-selected={tab === activeTab}
            active={(tab === activeTab).toString()}
            /* classname hontan estiloa aldatu behar bada "===" "!==" gatik aldatuz nahikoa da */
            className={cx(
              'product-tab-button',
              tab === activeTab && 'tab-selected',
            )}
            onClick={() => {
              handleAction(activeTab, tab);
            }}
            onKeyDown={() => {
              handleAction(activeTab, tab);
            }}
            tabIndex="0"
          >
            {title || defaultTitle}
            {title === 'Summary' ? (
              <FontAwesomeIcon icon={['fas', 'list-ul']} />
            ) : title === 'Detailed' ? (
              <FontAwesomeIcon icon={['fas', 'table']} />
            ) : (
              ''
            )}
          </span>
        );
      })}
    </div>
  );
};

const PanelsComponent = (props) => {
  const { metadata = {}, tabsList = [], activeTab = null, tabs = {} } = props;
  return (
    <div className="panels">
      {tabsList
        .filter((tab) => tab === activeTab)
        .map((tab, index) => {
          return (
            <div
              key={index}
              className={cx('panel', tab === activeTab && 'panel-selected')}
              id={`tab-${index}`}
              role="tabpanel"
              aria-hidden="false"
            >
              <RenderBlocks
                {...props}
                metadata={metadata}
                content={tabs[tab]}
              />
            </div>
          );
        })}
    </div>
  );
};

const CclProductToggleView = (props) => {
  return (
    <div className="product-tab-view">
      <div className="container">
        <div className="header-row">
          {props.data.productIcon === 'Landscape green bg' ? (
            <ReactSVG src={LandCoverImage} />
          ) : props.data.productIcon === 'Warning green bg' ? (
            <ReactSVG src={PriorityAreaImage} />
          ) : props.data.productIcon === 'Leaf green bg' ? (
            <ReactSVG src={BioGeoPhysicalImage} />
          ) : props.data.productIcon === 'Computer green bg' ? (
            <ReactSVG src={GroundMotionImage} />
          ) : props.data.productIcon === 'Database green bg' ? (
            <ReactSVG src={ReferenceAndValidationImage} />
          ) : props.data.productIcon === 'Satellite green bg' ? (
            <ReactSVG src={SatelliteImage} />
          ) : (
            ''
          )}
          <div className="product-title">{props.data.title}</div>
        </div>
        <TabsComponent {...props} />
      </div>
      <div className="product-description">{props.data.description}</div>
      <PanelsComponent {...props} />
    </div>
  );
};

export default compose(
  connect((state) => {
    return {
      hashlink: state.hashlink,
    };
  }),
  withScrollToTarget,
)(withRouter(CclProductToggleView));
