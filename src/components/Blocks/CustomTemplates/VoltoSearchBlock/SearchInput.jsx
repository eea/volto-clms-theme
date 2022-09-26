import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import loupeSVG from '@plone/volto/icons/zoom.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const SearchInput = (props) => {
  const {
    data,
    searchText,
    setSearchText,
    isLive,
    onTriggerSearch,
    ...rest
  } = props;
  const intl = useIntl();

  React.useEffect(() => {
    if (rest.searchedText !== '') {
      onTriggerSearch(rest.searchedText);
      setSearchText(rest.searchedText);
    }
    return () => {};
  }, [rest.searchedText, onTriggerSearch, setSearchText]);

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
            onTriggerSearch(searchText);
          }
        }}
      />
      {isLive && (
        <Button basic icon className="search-input-live-icon-button">
          <Icon name={loupeSVG} />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
