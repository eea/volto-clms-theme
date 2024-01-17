import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//import { injectIntl } from 'react-intl';
import TextareaWidget from '@plone/volto/components/manage/Widgets/TextareaWidget';

const TextareaWithRequestData = (props) => {
  const { onChange, id } = props;
  const { search } = useLocation();

  const hashMatch = decodeURIComponent(
    search.includes('text')
      ? search.match(/.*(\?text=.*)/)[1].replace(/\?text=/, '')
      : '',
  );

  useEffect(() => {
    if (hashMatch) {
      onChange(id, hashMatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashMatch]);

  return (
    <TextareaWidget {...props} defaultValue={hashMatch} formHasErrors={false} />
  );
};

export default TextareaWithRequestData;
