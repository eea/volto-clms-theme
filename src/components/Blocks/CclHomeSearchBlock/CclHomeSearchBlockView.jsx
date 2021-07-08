import React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';

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

function hasProtocol(url) {
  return url.startsWith('https://') || url.startsWith('http://') ? true : false;
}

const CclSearchBlockView = (props) => {
  const { data } = props;
  const intl = useIntl();
  let url = data?.link?.[0]?.['@id'];
  return (
    <div className="home-datasets-container">
      <div className="ccl-container">
        <h3>{data.title}</h3>
        <div className="home-datasets-search">
          <form className="ccl-form search-form">
            <input
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
            <button className="ccl-button" type="submit" aria-label="Search">
              <span className="ccl-icon-zoom"></span>
            </button>
          </form>
        </div>
        <div className="home-datasets-text">
          <span>{intl.formatMessage(messages.countText, { count: 999 })}</span>
          {hasProtocol(url) ? (
            <a href={url}>{data.linkText}</a>
          ) : (
            <Link to={url}>{data.linkText}</Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default CclSearchBlockView;
