import React from 'react';
//import { injectIntl } from 'react-intl';
import TextareaWidget from '@plone/volto/components/manage/Widgets/TextareaWidget';

import { useLocation } from 'react-router-dom';

const TextareaWithRequestData = (props) => {
  const { search } = useLocation();

  const hashMatch = decodeURIComponent(
    search.includes('text')
      ? search.match(/.*(\?text=.*)/)[1].replace(/\?text=/, '')
      : '',
  );

  return <TextareaWidget {...props} value={hashMatch} />;
};

export default TextareaWithRequestData;
