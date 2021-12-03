import React from 'react';
import CclVerticalTabsView from './CclVerticalTabsView';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

const CclProductTabsView = (props) => {
  const locale = useSelector((state) => state.intl.locale);
  const ExtraComponent = () => (
    <div className="left-menu-detail">
      <div className="menu-detail-image">
        {props.metadata?.image ? (
          <img
            src={props.metadata?.image?.scales?.preview?.download}
            alt={props.metadata?.title || 'Product map preview'}
          />
        ) : (
          <img
            src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
            alt="Product map preview"
            style={{ opacity: 0.5 }}
          />
        )}
      </div>
      <div className="menu-detail-button">
        <a
          href={'/' + locale + '/map-viewer?product=' + props.metadata['UID']}
          className="ccl-button ccl-button--default"
        >
          <FormattedMessage
            id="View in the map viewer"
            defaultMessage="View in the map viewer"
          />
        </a>
      </div>
    </div>
  );

  return <CclVerticalTabsView {...props} ExtraComponent={ExtraComponent} />;
};

export default CclProductTabsView;
