import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { pushInstruction, trackSiteSearch } from '@eeacms/volto-matomo/utils';

export const CustomMatomoAppExtra = () => {
  const { id } = useSelector((state) => state.users.user);
  const { search } = useSelector((state) => state.router.location);

  React.useEffect(() => {
    if (id) {
      pushInstruction('setUserId', id);
    }
  }, [id]);

  useEffect(() => {
    if (search.includes('?SearchableText=')) {
      const value = search.replace('?SearchableText=', '');
      trackSiteSearch({ keyword: value });
    }
  }, [search]);

  return <React.Fragment />;
};

export default CustomMatomoAppExtra;
