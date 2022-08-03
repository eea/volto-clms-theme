import { defineMessages, useIntl } from 'react-intl';

import React from 'react';

const messages = defineMessages({
  countText: {
    id: 'countText',
    defaultMessage: 'More than {count} datasets in our ',
  },
  searchDatasetsPlaceholder: {
    id: 'searchDatasetsPlaceholder',
    defaultMessage: 'Search datasets',
  },
});

const CclHomeSearchBlockView = (props) => {
  const { data, searchText } = props;
  var SearchText = searchText || '';
  const intl = useIntl();

  function handleChange(event) {
    SearchText = event.target.value;
  }

  function handlePost(event) {
    event.preventDefault();
    window.location.href = '/en/dataset-catalog/?SearchableText=' + SearchText;
  }

  return (
    <div className="home-datasets-container">
      <div className="ccl-container">
        <h3>{data.title}</h3>
        <div className="home-datasets-search">
          <form className="ccl-form search-form">
            <input
              value={searchText}
              onChange={handleChange}
              type="text"
              className="ccl-text-input"
              id="home_search_datasets"
              name="homeSearchDatasets"
              placeholder={intl.formatMessage(
                messages.searchDatasetsPlaceholder,
              )}
              aria-label={intl.formatMessage(
                messages.searchDatasetsPlaceholder,
              )}
            />
            <button
              className="ccl-button"
              type="submit"
              aria-label="Search"
              onClick={handlePost}
            >
              <span className="ccl-icon-zoom"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CclHomeSearchBlockView;
