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
        {choices.map(({ label, choiceValue }, i) => (
          <div className="ccl-form-group" key={choiceValue}>
            <Checkbox
              disabled={isEditMode}
              label={label}
              radio={!isMulti}
              checked={
                isMulti
                  ? !!facetValue?.find((f) => f.value === choiceValue)
                  : facetValue && facetValue.value === choiceValue
              }
              onChange={(e, { checked }) =>
                onChange(
                  facet.field.value,
                  isMulti
                    ? [
                        ...facetValue
                          .filter((f) => f.value !== choiceValue)
                          .map((f) => f.value),
                        ...(checked ? [choiceValue] : []),
                      ]
                    : checked
                    ? choiceValue
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
