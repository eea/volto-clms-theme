/**
 * TaxonomyWidget component.
 * @module components/manage/Widgets/TaxonomyWidget
 */

import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { map } from 'lodash';
import { injectIntl } from 'react-intl';
import {
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
} from '@plone/volto/helpers';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { getVocabulary, getVocabularyTokenTitle } from '@plone/volto/actions';
import downSVG from '@plone/volto/icons/down-key.svg';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { Checkbox, Grid, List } from 'semantic-ui-react';

/**
 * TaxonomyWidget component class.
 * @function TaxonomyWidget
 * @returns {string} Markup of the component.
 */
class TaxonomyWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    getVocabulary: PropTypes.func.isRequired,
    getVocabularyTokenTitle: PropTypes.func.isRequired,
    choices: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    ),
    items: PropTypes.shape({
      vocabulary: PropTypes.object,
    }),
    widgetOptions: PropTypes.shape({
      vocabulary: PropTypes.object,
    }),
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.array,
    ]),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    wrapped: PropTypes.bool,
    noValueOption: PropTypes.bool,
    customOptionStyling: PropTypes.any,
    isMulti: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    items: {
      vocabulary: null,
    },
    widgetOptions: {
      vocabulary: null,
    },
    error: [],
    choices: [],
    value: null,
    onChange: () => {},
    onBlur: () => {},
    onClick: () => {},
    onEdit: null,
    onDelete: null,
    noValueOption: true,
    customOptionStyling: null,
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (
      (!this.props.choices || this.props.choices?.length === 0) &&
      this.props.vocabBaseUrl
    ) {
      this.props.getVocabulary({
        vocabNameOrURL: this.props.vocabBaseUrl,
        size: -1,
        subrequest: this.props.intl.locale,
      });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { id, value, onChange } = this.props;
    // const normalizedValue = normalizeValue(choices, value, intl);

    let options = [];
    if (this.props.vocabBaseUrl && this.props.choices?.length > 0) {
      this.props.choices.forEach((option) => {
        var splitted_option = option.label.split(' » ');
        var modified_option = {
          value: option.value,
          label:
            splitted_option.length > 1
              ? splitted_option.slice(-1).pop()
              : option.label,
          childrens: [],
        };
        splitted_option.length === 1 && options.push(modified_option);
        if (splitted_option.length > 1) {
          var parent_option = splitted_option.slice(0, -1).pop();
          options.map((ionOption) => {
            if (ionOption.label === parent_option) {
              ionOption.childrens.push(modified_option);
            }
            return '';
          });
        }
      });
    }

    return (
      <FormFieldWrapper {...this.props}>
        <div
          className="wrapper"
          style={{
            paddingLeft: '40px',
            paddingTop: '25px',
            paddingBottom: '25px',
          }}
        >
          <List>
            {map(options, (option) => (
              <CheckboxListParent
                option={option}
                key={option.value}
                onChange={onChange}
                value={value}
                id={id}
              />
            ))}
          </List>
        </div>
      </FormFieldWrapper>
    );
  }
}

const CheckboxListParent = ({ option, key, onChange, value, id }) => {
  const [open, setOpen] = useState(false);
  return (
    <List.Item key={key} style={{ paddingTop: '15px' }}>
      <List.Content>
        <List.Header>
          <Grid>
            <Grid.Column width={10}>
              <Checkbox
                key={option.value}
                name={`field-${option.value}`}
                onChange={(event, { checked }) => {
                  checked
                    ? onChange(id, [
                        ...value,
                        { title: option.label, token: option.value },
                      ])
                    : onChange(
                        id,
                        value.filter((item) => item.token !== option.value),
                      );
                }}
                label={
                  <label htmlFor={`field-${option.value}`}>
                    {option.label}
                  </label>
                }
                checked={value.some((item) => item.token === option.value)}
                value={option.value}
              />
            </Grid.Column>
            <Grid.Column
              onClick={() => setOpen(!open)}
              width={2}
              style={{ cursor: 'pointer' }}
              textAlign="center"
            >
              <Icon className="" name={downSVG} size={25} />
            </Grid.Column>
          </Grid>
        </List.Header>
        {option.childrens.length > 0 && (
          <List.Item style={{ display: !open && 'none' }}>
            <List.List style={{ paddingLeft: '25px' }}>
              {map(option.childrens, (child) => (
                <List.Item>
                  <List.Content>
                    <List.Header>
                      <Checkbox
                        key={child.value}
                        name={`field-${child.value}`}
                        disabled={false}
                        onChange={(event, { checked }) => {
                          checked
                            ? onChange(id, [
                                ...value,
                                { title: child.label, token: child.value },
                              ])
                            : onChange(
                                id,
                                value.filter(
                                  (item) => item.token !== child.value,
                                ),
                              );
                        }}
                        label={
                          <label htmlFor={`field-${child.value}`}>
                            {child.label}
                          </label>
                        }
                        checked={value.some(
                          (item) => item.token === child.value,
                        )}
                        value={child.value}
                      />
                    </List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List.List>
          </List.Item>
        )}
      </List.Content>
    </List.Item>
  );
};

export const TaxonomyWidgetComponent = injectIntl(TaxonomyWidget);

export default compose(
  injectLazyLibs(['reactSelect']),
  connect(
    (state, props) => {
      const vocabBaseUrl = !props.choices
        ? getVocabFromHint(props) ||
          getVocabFromField(props) ||
          getVocabFromItems(props)
        : '';

      const vocabState =
        state.vocabularies?.[vocabBaseUrl]?.subrequests?.[props.intl.locale];

      // If the schema already has the choices in it, then do not try to get the vocab,
      // even if there is one
      if (props.choices) {
        return {
          choices: props.choices,
        };
      } else if (vocabState) {
        return {
          vocabBaseUrl,
          choices: vocabState?.items ?? [],
        };
        // There is a moment that vocabState is not there yet, so we need to pass the
        // vocabBaseUrl to the component.
      } else if (vocabBaseUrl) {
        return {
          vocabBaseUrl,
        };
      }
      return {};
    },
    { getVocabulary, getVocabularyTokenTitle },
  ),
)(TaxonomyWidgetComponent);
