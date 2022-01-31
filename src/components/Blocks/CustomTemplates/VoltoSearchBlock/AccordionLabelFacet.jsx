import React from 'react';
import { Checkbox } from 'semantic-ui-react';

const AccordionLabelFacet = (props) => {
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
      <div>
        <div className="filters-tag-container">
          {choices.map(({ label, value }, i) => (
            <div className="filters-tag" key={value}>
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
      </div>
    </fieldset>
  );
};

export default AccordionLabelFacet;
