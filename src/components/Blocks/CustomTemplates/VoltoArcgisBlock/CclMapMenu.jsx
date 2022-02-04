import React from 'react';

function CclMapMenu() {
  return (
    <div className="map-menu tab-container" style={{ display: 'block' }}>
      <div className="tabs" role="tablist">
        <span
          className="tab tab-selected"
          id="products_label"
          role="tab"
          aria-controls="products_panel"
          aria-selected="true"
        >
          Products and datasets
        </span>
        <span
          className="tab"
          id="active_label"
          role="tab"
          aria-controls="active_panel"
          aria-selected="false"
        >
          Active on map
        </span>
      </div>
      <div className="panels">
        <div
          className="panel panel-selected"
          id="products_panel"
          role="tabpanel"
          aria-hidden="false"
        ></div>
        <div
          className="panel"
          id="active_panel"
          role="tabpanel"
          aria-hidden="true"
        >
          <div className="no-active-datasets">No datasets selected</div>
        </div>
      </div>
    </div>
  );
}

export default CclMapMenu;
