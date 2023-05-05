import React from 'react';
import { Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

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
    </div>
  );
};

export default SearchInput;
