import React, { useEffect } from 'react';
import SelectWidget from 'volto-form-block/components/Widget/SelectWidget';
import { useLocation } from 'react-router-dom';

const SelectWithRequestWidget = (props) => {
  const { onChange, id, choices, required, field_custom_id } = props;
  const { search } = useLocation();
  let params = new URLSearchParams(search);

  useEffect(() => {
    if (choices.find((ch) => ch[0] === params.get(field_custom_id))) {
      onChange(
        id,
        choices.find((ch) => ch[0] === params.get(field_custom_id))[0],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get(field_custom_id)]);
  return (
    <SelectWidget
      {...props}
      defaultValue={
        choices.find((ch) => ch[0] === params.get(field_custom_id))
          ? params.get(field_custom_id)
          : null
      }
      noValueOption={!required}
    />
  );
};

export default SelectWithRequestWidget;
