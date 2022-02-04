import { Checkbox } from 'semantic-ui-react';
import React from 'react';

const AccordionLabelFacet = (props) => {
  const { facet, choices, isMulti, onChange, value, isEditMode } = props;
  const facetValue = value;
  var [open, setOpen] = React.useState(false);
  function isChoiceValue(isChecked, choiceValue) {
    return isChecked ? choiceValue : null;
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
        <div className="filters-tag-container">
          {choices.map((choice, i) => (
            <div className="filters-tag" key={choice.value}>
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
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  );
};

export default AccordionLabelFacet;
