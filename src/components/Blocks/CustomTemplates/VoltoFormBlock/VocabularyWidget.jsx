import React, { useEffect } from 'react';
import SelectWidget from '@plone/volto/components/manage/Widgets/SelectWidget';
import { useIntl, defineMessages } from 'react-intl';
import { getVocabulary } from '@plone/volto/actions';
import { useDispatch, useSelector } from 'react-redux';

const messages = defineMessages({
  select_a_value: {
    id: 'form_select_a_value',
    defaultMessage: 'Select a value',
  },
});

const VocabularyWidget = ({
  name,
  label,
  description,
  value,
  onChange,
  disabled,
  invalid,
  title,
  required,
  vocabulary,
  isMulti,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getVocabulary({
        vocabNameOrURL: vocabulary,
        size: -1,
      }),
    );
  }, [dispatch, vocabulary]);
  const vocabItems = useSelector((state) => state.vocabularies[vocabulary]);
  return (
    <SelectWidget
      id={name}
      name={name}
      title={title}
      required={required}
      description={description}
      getVocabulary={() => {}}
      getVocabularyTokenTitle={() => {}}
      choices={
        vocabItems?.loaded && [
          ...vocabItems.items.map((item) => {
            return [item.label, item.label];
          }),
        ]
      }
      value={value}
      onChange={onChange}
      placeholder={intl.formatMessage(messages.select_a_value)}
      aria-label={intl.formatMessage(messages.select_a_value)}
      classNamePrefix="react-select"
      isDisabled={disabled}
      invalid={invalid}
      isMulti={isMulti}
      {...(invalid === 'true' ? { className: 'is-invalid' } : {})}
    />
  );
};

export default VocabularyWidget;
