import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const SearchInput = (props) => {
  const { data, searchText, setSearchText, isLive, onTriggerSearch } = props;
  const intl = useIntl();

  return (
    <div className="search-input">
      <Input
        maxLength="200"
        id={`${props.id}-searchtext`}
        value={searchText}
        placeholder={
          data.searchInputPrompt || intl.formatMessage(messages.search)
        }
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
            <Icon name={clearSVG}></Icon>
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
