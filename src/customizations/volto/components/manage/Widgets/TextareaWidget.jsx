/**
 * TextareaWidget component.
 * @module components/manage/Widgets/TextareaWidget
 */
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Label, TextArea } from 'semantic-ui-react';

import { FormFieldWrapper } from '@plone/volto/components';

import PropTypes from 'prop-types';

/**
 * TextareaWidget, a widget for multiple lines text
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "Text",
 *  widget: 'textarea',
 * }
 * ```
 */
const TextareaWidget = (props) => {
  const { id, maxLength, value, onChange, placeholder, defaultValue } = props;
  const [lengthError, setlengthError] = useState('');

  const onhandleChange = (id, value) => {
    if (maxLength && value?.length) {
      let remlength = maxLength - value.length;
      if (remlength < 0) {
        setlengthError(
          `You have exceeded the character limit by ${Math.abs(remlength)}`,
        );
      } else {
        setlengthError('');
      }
    }
    onChange(id, value);
  };

  const simulateWrite = () => {
    // Simulate user typing a white space on component first load
    // to trigger validation and display error message if necessary
    if (!value && defaultValue) {
      onhandleChange(id, defaultValue + ' ');
    }
  };

  let values = {};
  if (defaultValue && value === null) {
    values['value'] = defaultValue;
  } else if (defaultValue) {
    values['defaultValue'] = defaultValue;
  } else {
    values['value'] = value || '';
  }

  return (
    <FormFieldWrapper {...props} className="textarea">
      <TextArea
        id={`field-${id}`}
        name={id}
        disabled={props.isDisabled}
        placeholder={placeholder}
        onChange={({ target }) =>
          onhandleChange(id, target.value === '' ? undefined : target.value)
        }
        ref={simulateWrite}
        {...values}
      />
      {lengthError.length > 0 && (
        <Label key={lengthError} basic color="red" pointing>
          {lengthError}
        </Label>
      )}
    </FormFieldWrapper>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
TextareaWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  wrapped: PropTypes.bool,
  placeholder: PropTypes.string,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
TextareaWidget.defaultProps = {
  description: null,
  maxLength: 8000,
  required: false,
  error: [],
  value: null,
  onChange: null,
  onEdit: null,
  onDelete: null,
};

export default injectIntl(TextareaWidget);
