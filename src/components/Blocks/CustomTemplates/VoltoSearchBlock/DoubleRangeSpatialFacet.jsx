import 'react-input-range/lib/css/index.css';

import React from 'react';

import InputRange from 'react-input-range';
import { Segment } from 'semantic-ui-react';
import { selectFacetStateToValue } from '@plone/volto/components/manage/Blocks/Search/components/base';
import { doubleRangeFacetSchemaEnhancer } from './utils.js';

const mToKm = (m) => {
  return m >= 1000 ? Math.round((m / 1000) * 10) / 10 + 'km' : m + 'm';
};

const realToCoded = (number, step) => {
  // the meters are going to be the same
  if (number <= 1000) return number;
  // for the km we are going to code any km after the first as tens
  // so 2 km will be 1020 and 3 km will be 1040
  const relation = step ? parseInt(step) : 1;
  const thousands = Math.floor(number / 1000);
  const hundreds = Math.floor((number - thousands * 1000) / 100);
  const tens = Math.floor((number - thousands * 1000 - hundreds * 100) / 10);
  let finalThousands = thousands;
  if (hundreds > 0 || tens > 0) finalThousands = thousands + 1;
  return 1000 + parseInt(finalThousands * relation);
};

const codedToReal = (number, step) => {
  // the meters are going to be the same
  if (number <= 1000) return number;
  // for the km we have to decode any tens after 1000
  // so 1020 will be 2 km and 1040 will be 3 km
  const relation = step ? parseInt(step) : 1;
  const codedThousands = parseInt(number) - 1000;
  return parseInt(codedThousands * (1000 / relation));
};

const convertToRange = (values, step) => {
  const nums = values
    .map((o) => {
      const raw = o.value !== undefined ? o.value : o;

      if (typeof raw === 'string') {
        return parseInt(raw.replace(/[a-zA-Z]/g, ''), 10);
      }

      if (typeof raw === 'number') {
        return raw;
      }

      return NaN;
    })
    .filter((n) => !isNaN(n));

  return {
    min: realToCoded(Math.min(...nums), step),
    max: realToCoded(Math.max(...nums), step),
  };
};

const DoubleRangeSpatialFacet = (props) => {
  const { facet, choices, onChange, value } = props;
  const facetValue = value;
  var [open, setOpen] = React.useState(facet.expandedByDefault ?? false);

  const startingValues = convertToRange(choices, facet?.step);

  const onChangeRange = (nValue, onChangeR, sValue) => {
    const fixedValue = {
      min: nValue.min < sValue.min ? sValue.min : nValue.min,
      max: nValue.max > sValue.max ? sValue.max : nValue.max,
    };
    onChangeR(
      facet.field.value,
      [...Array(fixedValue.max - fixedValue.min + 1).keys()].map((i) =>
        (i + fixedValue.min).toString(),
      ),
    );
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
      <div className="range-container">
        <Segment basic padded>
          <InputRange
            minValue={startingValues.min}
            maxValue={startingValues.max}
            step={facet.step ? parseInt(facet.step) : 1}
            value={
              facetValue.length > 0
                ? {
                    min: convertToRange(facetValue, facet?.step).min,
                    max: convertToRange(facetValue, facet?.step).max,
                  }
                : {
                    min: startingValues.min,
                    max: startingValues.max,
                  }
            }
            onChange={(changedValue) =>
              onChangeRange(
                {
                  min: codedToReal(changedValue.min, facet?.step),
                  max: codedToReal(changedValue.max, facet?.step),
                },
                onChange,
                {
                  min: codedToReal(startingValues.min, facet?.step),
                  max: codedToReal(startingValues.max, facet?.step),
                },
              )
            }
            formatLabel={(value) => {
              if (facet.field.value === 'spatial_resolution') {
                return mToKm(codedToReal(value, facet?.step));
              } else {
                return value;
              }
            }}
          />
        </Segment>
        <br />
      </div>
    </fieldset>
  );
};

const doubleRangeValueToQuery = ({ value, facet }) => {
  if (!value || value.length === 0) return undefined;

  const numericValues = value.map((v) => parseInt(v, 10)).sort((a, b) => a - b);

  return {
    i: facet.field.value,
    o: 'plone.app.querystring.operation.int.between', // implemented by us in clms.types
    v: [numericValues[0], numericValues[numericValues.length - 1]],
  };
};

DoubleRangeSpatialFacet.schemaEnhancer = doubleRangeFacetSchemaEnhancer;
DoubleRangeSpatialFacet.stateToValue = selectFacetStateToValue;
DoubleRangeSpatialFacet.valueToQuery = doubleRangeValueToQuery;
export default DoubleRangeSpatialFacet;
