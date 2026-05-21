import React from 'react';
import { Button, Icon as SemanticIcon, Image, Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { Icon as VoltoIcon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
// eslint-disable-next-line import/no-unresolved
import searchSVG from '@eeacms/search/components/SearchInput/icons/search.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const SearchIcon = () =>
  typeof searchSVG === 'string' ? (
    <Image src={searchSVG} />
  ) : (
    <svg
      xmlns={searchSVG.attributes && searchSVG.attributes.xmlns}
      viewBox={searchSVG.attributes && searchSVG.attributes.viewBox}
      style={{ width: 'auto', fill: 'currentColor' }}
      className="icon"
      dangerouslySetInnerHTML={{ __html: searchSVG.content }}
    />
  );

const SearchInput = (props) => {
  const {
    data,
    searchText,
    setSearchText,
    isLive,
    isGlobalSearch,
    useSearchlibSearchDesign = isGlobalSearch,
    onTriggerSearch,
  } = props;
  const intl = useIntl();
  const placeholder =
    data.searchInputPrompt || intl.formatMessage(messages.search);

  if (useSearchlibSearchDesign) {
    return (
      <div className="sui-search-box">
        <div className="search-input">
          <div className="terms-box">
            <input
              maxLength="200"
              id={`${props.id}-searchtext`}
              value={searchText}
              className=""
              placeholder={placeholder}
              enterKeyHint="search"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onTriggerSearch(searchText);
                }
              }}
              onChange={(event) => {
                setSearchText(event.target.value);
                if (isLive) {
                  onTriggerSearch(event.target.value);
                }
              }}
            />

            <div className="terms-box-left">
              <div className="input-controls">
                {searchText && (
                  <div className="ui button basic clear-button">
                    <SemanticIcon
                      tabIndex={0}
                      name="close"
                      role="button"
                      onClick={() => {
                        setSearchText('');
                        onTriggerSearch('');
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          setSearchText('');
                          onTriggerSearch('');
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              <div
                tabIndex={0}
                role="button"
                className="search-icon"
                onClick={() => onTriggerSearch(searchText)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    onTriggerSearch(searchText);
                  }
                }}
              >
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-input">
      <Input
        maxLength="200"
        id={`${props.id}-searchtext`}
        value={searchText}
        placeholder={placeholder}
        fluid
        onKeyPress={(event) => {
          if (isLive || event.key === 'Enter') onTriggerSearch(searchText);
        }}
        onChange={(event, { value }) => {
          setSearchText(value);
          if (isLive) {
            onTriggerSearch(value);
          }
        }}
      />
      <div className="search-input-actions">
        {searchText && (
          <Button
            basic
            icon
            className="search-input-clear-icon-button"
            onClick={() => {
              setSearchText('');
              onTriggerSearch('');
            }}
          >
            <VoltoIcon name={clearSVG}></VoltoIcon>
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
