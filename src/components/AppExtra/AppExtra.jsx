import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { pushInstruction, trackSiteSearch } from '@eeacms/volto-matomo/utils';
import config from '@plone/volto/registry';

export const CustomMatomoAppExtra = () => {
  const { id } = useSelector((state) => state.users.user);
  const { search, query, pathname } = useSelector(
    (state) => state.router.location,
  );

  const extractSearchableText = (query) => {
    // Handle catalog-querystring-like queries, which are
    // send in a JSON object
    if (query?.query) {
      let parsed = JSON.parse(unescape(query.query));
      let items = parsed.filter((item) => item.i === 'SearchableText');
      if (items.length === 1) {
        return items[0].v;
      }
    }

    // check if there is an explicit SearchableText parameter
    // in the querystring
    if (query?.SearchableText) {
      return query.SearchableText;
    }

    return '';
  };

  React.useEffect(() => {
    if (id) {
      pushInstruction('setUserId', id);
    }
  }, [id]);

  useEffect(() => {
    const searchableText = extractSearchableText(query);
    if (
      config.settings.track_search_paths.includes(pathname) &&
      searchableText
    ) {
      trackSiteSearch({ keyword: searchableText });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return <React.Fragment />;
};

export default CustomMatomoAppExtra;
