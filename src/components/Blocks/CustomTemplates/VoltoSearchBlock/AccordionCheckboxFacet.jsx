import React from 'react';
import { Checkbox } from 'semantic-ui-react';

const AccordionCheckboxFacet = (props) => {
  const { facet, choices, isMulti, onChange, value, isEditMode } = props;
  const facetValue = value;
  var [open, setOpen] = React.useState(false);

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
      <div className="ccl-form">
        {choices.map(({ label, value }, i) => (
          <div className="ccl-form-group" key={value}>
            <Checkbox
              disabled={isEditMode}
              label={label}
              radio={!isMulti}
              checked={
                isMulti
                  ? !!facetValue?.find((f) => f.value === value)
                  : facetValue && facetValue.value === value
              }
              onChange={(e, { checked }) =>
                onChange(
                  facet.field.value,
                  isMulti
                    ? [
                        ...facetValue
                          .filter((f) => f.value !== value)
                          .map((f) => f.value),
                        ...(checked ? [value] : []),
                      ]
                    : checked
                    ? value
                    : null,
                )
              }
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default AccordionCheckboxFacet;
