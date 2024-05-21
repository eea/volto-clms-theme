import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//import { injectIntl } from 'react-intl';
import TextareaWidget from '@plone/volto/components/manage/Widgets/TextareaWidget';

const TextareaWithRequestData = (props) => {
  const { onChange, id } = props;
  const { search } = useLocation();
  let params = new URLSearchParams(search);

  useEffect(() => {
    if (params.get('text')) {
      onChange(id, params.get('text'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get('text')]);

  return (
    <TextareaWidget
      {...props}
      defaultValue={params.get('text')}
      formHasErrors={false}
    />
  );
};

export default TextareaWithRequestData;
