import { Checkbox, List } from 'semantic-ui-react';
import React from 'react';
import {
  selectFacetStateToValue,
  selectFacetValueToQuery,
} from '@plone/volto/components/manage/Blocks/Search/components/base';
import { expandedByDefault } from './utils.js';

const AccordionFacet = (props) => {
  const {
    facet,
    choices,
    isMulti,
    onChange,
    value,
    isEditMode,
    typeName,
  } = props;
  const facetValue = value;
  var [open, setOpen] = React.useState(facet.expandedByDefault ?? false);
  function isChoiceValue(isChecked, choiceValue) {
    return isChecked ? choiceValue : null;
  }

  const Wrapper = ({ typeName, children }) => {
    if (typeName === 'checkbox') {
      return <div className="ccl-form">{children}</div>;
    } else if (typeName === 'label') {
      return (
        <div>
          <div className="filters-tag-container">{children}</div>
        </div>
      );
    }
  };

  return (
    <fieldset className="ccl-fieldset">
      <div
        className="ccl-expandable__button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={() => setOpen(!open)}
        tabIndex={0}
        role={'button'}
      >
        <legend className="ccl-form-legend">{facet.title}</legend>
      </div>
      <Wrapper typeName={typeName}>
        <List>
          {choices.map((choice, i) => (
            <List.Item
              key={choice.value}
              style={{
                paddingLeft: '15px',
                paddingBottom: '15px',
                paddingTop: '10px',
              }}
            >
              <List.Content>
                <List.Header>
                  <Checkbox
                    disabled={isEditMode}
                    label={choice.label}
                    radio={!isMulti}
                    checked={
                      isMulti
                        ? !!facetValue?.find((f) => f.value === choice.value)
                        : facetValue && facetValue.value === choice.value
                    }
                    onChange={(e, { checked }) =>
                      onChange(
                        facet.field.value,
                        isMulti
                          ? [
                              ...facetValue
                                .filter((f) => f.value !== choice.value)
                                .map((f) => f.value),
                              ...(checked ? [choice.value] : []),
                            ]
                          : isChoiceValue(checked, choice.value),
                      )
                    }
                  />
                </List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Wrapper>
    </fieldset>
  );
};

AccordionFacet.schemaEnhancer = ({ schema, formData }) => {
  return expandedByDefault(schema);
};
AccordionFacet.stateToValue = selectFacetStateToValue;
AccordionFacet.valueToQuery = selectFacetValueToQuery;
export default AccordionFacet;
