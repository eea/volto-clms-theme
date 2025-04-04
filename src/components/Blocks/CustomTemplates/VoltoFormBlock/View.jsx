import React, { useState, useEffect, useReducer, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useIntl, defineMessages } from 'react-intl';
import { submitForm } from 'volto-form-block/actions';
import { getFieldName } from 'volto-form-block/components/utils';
import FormView from 'volto-form-block/components/FormView';
import { formatDate } from '@plone/volto/helpers/Utils/Date';
import config from '@plone/volto/registry';
import Captcha from 'volto-form-block/components/Widget/Captcha';

const messages = defineMessages({
  formSubmitted: {
    id: 'formSubmitted',
    defaultMessage: 'Form successfully submitted',
  },
});

const initialState = {
  loading: false,
  error: null,
  result: null,
};

const FORM_STATES = {
  normal: 'normal',
  loading: 'loading',
  error: 'error',
  success: 'success',
};

const formStateReducer = (state, action) => {
  switch (action.type) {
    case FORM_STATES.normal:
      return initialState;

    case FORM_STATES.loading:
      return { loading: true, error: null, result: null };

    case FORM_STATES.error:
      return { loading: false, error: action.error, result: null };

    case FORM_STATES.success:
      return { loading: false, error: null, result: action.result };

    default:
      return initialState;
  }
};

const getInitialData = (data) => ({
  ...data.reduce(
    (acc, field) => ({ ...acc, [getFieldName(field.label, field.id)]: field }),
    {},
  ),
});

/**
 * Form view
 * @class View
 */
const View = ({ data, id, path }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { static_fields = [] } = data;

  const [formData, setFormData] = useReducer((state, action) => {
    if (action.reset) {
      return getInitialData(static_fields);
    }

    return {
      ...state,
      [action.field]: action.value,
    };
  }, getInitialData(static_fields));

  const [formState, setFormState] = useReducer(formStateReducer, initialState);
  const [formErrors, setFormErrors] = useState([]);
  const submitResults = useSelector((state) => state.submitForm);
  const captchaToken = useRef();

  const onChangeFormData = (field_id, field, value, extras) => {
    setFormData({ field, value: { field_id, value, ...extras } });
  };

  useEffect(() => {
    if (formErrors.length > 0) {
      isValidForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const isValidForm = () => {
    const v = [];
    data.subblocks.forEach((subblock, index) => {
      const name = getFieldName(subblock.label, subblock.id);
      const fieldType = subblock.field_type;
      const additionalField =
        config.blocks.blocksConfig.form.additionalFields?.filter(
          (f) => f.id === fieldType && f.isValid !== undefined,
        )?.[0] ?? null;
      if (
        subblock.required &&
        additionalField &&
        !additionalField?.isValid(formData, name)
      ) {
        v.push(name);
      } else if (
        subblock.required &&
        fieldType === 'checkbox' &&
        !formData[name]?.value
      ) {
        v.push(name);
      } else if (
        subblock.required &&
        (!formData[name] ||
          formData[name]?.value?.length === 0 ||
          JSON.stringify(formData[name]?.value ?? {}) === '{}')
      ) {
        v.push(name);
      }
    });

    if (data.captcha && !captchaToken.current) {
      v.push('captcha');
    }

    setFormErrors(v);
    return v.length === 0;
  };

  const submit = (e) => {
    if (captcha && captcha.props.captcha === 'friendly_captcha') {
      captcha.verify = () => {
        return Promise.resolve(true);
      };
    }

    e.preventDefault();
    captcha
      .verify()
      .then(() => {
        if (isValidForm()) {
          let attachments = {};
          let captcha = {
            provider: data.captcha,
            token: captchaToken.current,
          };
          if (data.captcha === 'honeypot') {
            captcha.value = formData[data.captcha_props.id]?.value ?? '';
          }

          let formattedFormData = { ...formData };
          data.subblocks.forEach((subblock) => {
            let name = getFieldName(subblock.label, subblock.id);
            if (formattedFormData[name]?.value) {
              formattedFormData[name].field_id = subblock.field_id;
              // const isAttachment = subblock.field_type === 'attachment';
              const isAttachment = [
                'attachment',
                'image_field_widget',
                'attachment_with_size_limit',
              ].includes(subblock.field_type);
              const isDate = subblock.field_type === 'date';

              if (isAttachment) {
                attachments[name] = formattedFormData[name].value;
                delete formattedFormData[name];
              }

              if (isDate) {
                formattedFormData[name].value = formatDate({
                  date: formattedFormData[name].value,
                  format: 'DD-MM-YYYY',
                  locale: intl.locale,
                });
              }
            }
          });

          const sortedFormattedFormData = Object.keys(formattedFormData)
            .sort((a, b) => {
              return (
                data.subblocks
                  .map((subblock) => getFieldName(subblock.label, subblock.id))
                  .indexOf(a) -
                data.subblocks
                  .map((subblock) => getFieldName(subblock.label, subblock.id))
                  .indexOf(b)
              );
            })
            .reduce((accumulator, key) => {
              accumulator[key] = formattedFormData[key];

              return accumulator;
            }, {});
          dispatch(
            submitForm(
              path,
              id,
              Object.keys(sortedFormattedFormData).map((name) => ({
                ...sortedFormattedFormData[name],
              })),
              attachments,
              captcha,
            ),
          );
          setFormState({ type: FORM_STATES.loading });
        } else {
          setFormState({ type: FORM_STATES.error });
        }
      })
      .catch(() => {
        setFormState({ type: FORM_STATES.error });
      });
  };

  const resetFormState = () => {
    setFormData({ reset: true });
    setFormState({ type: FORM_STATES.normal });
  };

  const resetFormOnError = () => {
    setFormState({ type: FORM_STATES.normal });
  };

  const captcha = new Captcha({
    captchaToken,
    captcha: data.captcha,
    captcha_props: data.captcha_props,
    onChangeFormData,
  });

  const formid = `form-${id}`;

  useEffect(() => {
    if (submitResults?.loaded) {
      setFormState({
        type: FORM_STATES.success,
        result: intl.formatMessage(messages.formSubmitted),
      });
      captcha.reset();
      const formItem = document.getElementById(formid);
      if (formItem !== null) {
        const formItemPosition = formItem.getBoundingClientRect();
        formItemPosition !== null &&
          window.scrollTo({
            top: formItemPosition.x,
            left: formItemPosition.y,
            behavior: 'smooth',
          });
      }
    } else if (submitResults?.error) {
      let errorDescription = `${
        JSON.parse(submitResults.error.response?.text ?? '{}')?.message
      }`;

      setFormState({ type: FORM_STATES.error, error: errorDescription });
    }
    captchaToken.current = undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitResults]);

  useEffect(() => {
    resetFormState();
  }, []);

  return (
    <FormView
      id={formid}
      formState={formState}
      formErrors={formErrors}
      formData={formData}
      captcha={captcha}
      onChangeFormData={onChangeFormData}
      data={data}
      onSubmit={submit}
      resetFormState={resetFormState}
      resetFormOnError={resetFormOnError}
    />
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
