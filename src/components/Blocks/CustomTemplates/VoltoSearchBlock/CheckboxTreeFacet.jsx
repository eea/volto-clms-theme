import 'react-input-range/lib/css/index.css';
import './range.css';

import React, { useState } from 'react';
import { Checkbox, List } from 'semantic-ui-react';

const CheckboxTreeFacet = (props) => {
  const { facet, choices, onChange, value } = props;
  const facetValue = value;
  var [open, setOpen] = useState(false);
  let options = [];
  if (choices?.length > 0) {
    choices.forEach((choice) => {
      var splitted_option = choice.label.split(' » ');
      var modified_option = {
        value: choice.value,
        label:
          splitted_option.length > 1
            ? splitted_option.slice(-1).pop()
            : choice.label,
        original: choice.label,
        childrens: [],
      };
      splitted_option.length === 1 && options.push(modified_option);
      if (splitted_option.length > 1) {
        var parent_option = splitted_option.slice(0, -1).pop();
        options.map((option) => {
          if (option.label === parent_option) {
            option.childrens.push(modified_option);
          }
          return '';
        });
      }
    });
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
                    ...value
                      .filter((f) => f.value !== option.value)
                      .map((f) => f.value),
                    ...(checked ? [option.value] : []),
                  ])
                : onChange(
                    id,
                    value.filter((item) => item.value !== option.value),
                  );
            }}
            label={
              <label htmlFor={`field-${option.value}`}>{option.label}</label>
            }
            checked={value.some((item) => item.value === option.value)}
            value={option.value}
          />
        </List.Header>
        {option.childrens.length > 0 && (
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
        )}
      </List.Content>
    </List.Item>
  );
};

export default CheckboxTreeFacet;
