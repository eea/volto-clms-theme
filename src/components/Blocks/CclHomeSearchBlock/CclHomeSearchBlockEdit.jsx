import React from 'react';
import { HomeSearchSchema } from './HomeSearchSchema';
import { Link } from 'react-router-dom';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
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
  if (url) {
    return url.startsWith('https://') || url.startsWith('http://')
      ? true
      : false;
  }
  return false;
}

const CclSearchBlockEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;
  const intl = useIntl();
  let url = data?.link?.[0]?.['@id'];
  return (
    <>
      <div className="home-datasets-container">
        <div className="ccl-container">
          <h3>{data.title || 'Find and download data'}</h3>
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
            <span>
              {intl.formatMessage(messages.countText, { count: 999 })}
            </span>
            {hasProtocol(url) ? (
              <a href={url && url}>{data.linkText || 'Dataset catalogue'}</a>
            ) : (
              <Link to={url && url}>
                {data.linkText || 'Dataset catalogue'}
              </Link>
            )}
          </div>
        </div>
      </div>
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={HomeSearchSchema()}
          title={HomeSearchSchema().title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};
export default CclSearchBlockEdit;
