import React from 'react';

const CclSearchBlockView = (props) => {
  return (
    <div className="home-datasets-container">
      <div className="ccl-container">
        <h3>Find and download data</h3>
        <div className="home-datasets-search">
          <form className="ccl-form search-form">
            <input
              type="text"
              className="ccl-text-input"
              id="home_search_datasets"
              name="homeSearchDatasets"
              placeholder="Search datasets"
              aria-label="Search datasets"
            />
            <button className="ccl-button" type="submit" aria-label="Search">
              <span className="ccl-icon-zoom"></span>
            </button>
          </form>
        </div>
        <div className="home-datasets-text">
          <span>More than XXX.XXX datasets in our </span>
          <a href="./dataset-catalogue.html">Dataset catalogue</a>
        </div>
      </div>
    </div>
  );
};
export default CclSearchBlockView;
