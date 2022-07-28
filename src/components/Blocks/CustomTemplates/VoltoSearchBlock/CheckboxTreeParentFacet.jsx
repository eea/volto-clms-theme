import 'react-input-range/lib/css/index.css';
import './range.css';

import React, { useState } from 'react';
import { Checkbox, List } from 'semantic-ui-react';
import { structure_taxonomy_terms } from '@eeacms/volto-clms-theme/components';

import {
  selectFacetSchemaEnhancer,
  selectFacetStateToValue,
  selectFacetValueToQuery,
} from '@plone/volto/components/manage/Blocks/Search/components/base';

const hasAllChildrensSelected = (value, childrens) => {
  var result = true;
  if (!childrens || childrens.length === 0) {
    result = false;
  }
  childrens.forEach((ch) => {
    if (value.filter((v) => v.value === ch.value).length === 0) {
      result = false;
    }
  });
  return result;
};

const checkAllChildren = (value, childrens) => {
  if (!childrens || childrens.length === 0) {
    return value;
  }
  childrens.forEach((ch) => {
    if (value.filter((v) => v.value === ch.value).length === 0) {
      value.push(ch);
    }
  });
  return value;
};

const CheckboxTreeParentFacet = (props) => {
  const { facet, choices, onChange, value } = props;
  const facetValue = value;
  var [open, setOpen] = useState(false);
  let options = [];
  if (choices?.length > 0) {
    options = structure_taxonomy_terms(choices);
  }
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
      <div>
        <List>
          {options.map((option) => (
            <CheckboxListParent
              option={option}
              key={option.value}
              onChange={onChange}
              value={facetValue}
              id={facet.field.value}
            />
          ))}
        </List>
      </div>
    </fieldset>
  );
};

const CheckboxListParent = ({ option, key, onChange, value, id }) => {
  return (
    <List.Item
      key={key}
      style={{ paddingLeft: '15px', paddingBottom: '15px', paddingTop: '10px' }}
    >
      <List.Content>
        <List.Header>
          <Checkbox
            key={option.value}
            name={`field-${option.value}`}
            onChange={(event, { checked }) => {
              checked
                ? onChange(id, [
                    // if this option has children, check them all
                    ...checkAllChildren(value, option.childrens).map(
                      (f) => f.value,
                    ),
                  ])
                : onChange(id, [
                    ...value
                      .filter((item) => item.value !== option.value)
                      .filter(
                        (item) =>
                          option.childrens?.length > 0 &&
                          !option.childrens
                            .map((ch) => ch.value)
                            .includes(item.value),
                      )
                      .map((f) => f.value),
                  ]);
            }}
            label={
              <label htmlFor={`field-${option.value}`}>{option.label}</label>
            }
            checked={
              value.some((item) => item.value === option.value) ||
              hasAllChildrensSelected(value, option.childrens)
            }
            value={option.value}
          />
        </List.Header>
        {/* {option.childrens.length > 0 && (
          <List.Item>
            <List.List style={{ paddingLeft: '25px' }}>
              {option.childrens.map((child) => (
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
                                ...value
                                  .filter((f) => f.value !== child.value)
                                  .map((f) => f.value),
                                ...(checked ? [child.value] : []),
                              ])
                            : onChange(id, [
                                ...value
                                  .filter((item) => item.value !== child.value)
                                  .map((f) => f.value),
                              ]);
                        }}
                        label={
                          <label htmlFor={`field-${child.value}`}>
                            {child.label}
                          </label>
                        }
                        checked={value.some(
                          (item) => item.value === child.value,
                        )}
                        value={child.value}
                      />
                    </List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List.List>
          </List.Item>
        )} */}
      </List.Content>
    </List.Item>
  );
};

CheckboxTreeParentFacet.schemaEnhancer = selectFacetSchemaEnhancer;
CheckboxTreeParentFacet.stateToValue = selectFacetStateToValue;
CheckboxTreeParentFacet.valueToQuery = selectFacetValueToQuery;
export default CheckboxTreeParentFacet;