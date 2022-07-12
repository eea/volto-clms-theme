/**
 * EmailWidget component.
 * @module components/manage/Widgets/EmailWidget
 */

import { FormFieldWrapper } from '@plone/volto/components';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

/** EmailWidget, a widget for email addresses
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "Email",
 *  widget: 'email',
 * }
 * ```
 */
const EmailWidget = (props) => {
  const {
    id,
    value = '',
    onChange,
    onBlur,
    onClick,
    minLength,
    placeholder,
    isDisabled,
  } = props;
  const inputId = `field-${id}`;
  const intl = useIntl();

  const messages = defineMessages({
    invalid_email: {
      id: 'The entered email address is not valid',
      defaultMessage: 'The entered email address is not valid',
    },
  });

  const email =
    typeof window !== 'undefined' && document.getElementById(inputId) !== null
      ? document.getElementById(inputId).value
      : '';
  // email.addEventListener('input', function (e) {
  React.useEffect(() => {
    if (email !== '') {
      if (email.validity.typeMismatch) {
        email.setCustomValidity(intl.formatMessage(messages.invalid_email));
        email.reportValidity();
      } else {
        email.setCustomValidity('');
      }
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email.value]);
  // });

  return (
    <FormFieldWrapper {...props} className="email">
      <input
        className="ui input"
        id={inputId}
        name={id}
        type="email"
        value={value || ''}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={({ target }) =>
          onChange(id, target.value === '' ? undefined : target.value)
        }
        onBlur={({ target }) =>
          onBlur(id, target.value === '' ? undefined : target.value)
        }
        onClick={() => onClick()}
        minLength={minLength || null}
        maxLength={200}
      />
    </FormFieldWrapper>
  );
};

/**
 * Property types
 * @property {Object} propTypes Property types.
 * @static
 */
EmailWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
EmailWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
  onChange: () => {},
  onBlur: () => {},
  onClick: () => {},
  minLength: null,
  maxLength: null,
};

export default EmailWidget;
