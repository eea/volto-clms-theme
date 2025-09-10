import 'react-input-range/lib/css/index.css';

import React from 'react';
import InputRange from 'react-input-range';
import { Segment } from 'semantic-ui-react';
import { selectFacetStateToValue } from '@plone/volto/components/manage/Blocks/Search/components/base';
import { doubleRangeFacetSchemaEnhancer } from './utils.js';

const mToKm = (m) =>
  m >= 1000 ? `${Math.round((m / 1000) * 10) / 10}km` : `${m}m`;

const extractNumbers = (values) =>
  values
    .map((o) => {
      const raw = o?.value ?? o;
      if (typeof raw === 'string')
        return parseInt(raw.replace(/[^\d]/g, ''), 10);
      if (typeof raw === 'number') return raw;
      return NaN;
    })
    .filter((n) => !isNaN(n));

const convertToRange = (values) => {
  const nums = extractNumbers(values);
  return {
    min: Math.min(...nums),
    max: Math.max(...nums),
  };
};

const DoubleRangeSpatialFacet = (props) => {
  const { facet, choices, onChange, value } = props;
  const [open, setOpen] = React.useState(facet.expandedByDefault ?? false);

  const startingValues = convertToRange(choices);
  const currentValues =
    value.length > 0 ? convertToRange(value) : startingValues;

  const onChangeRange = (nValue) => {
    const fixedValue = {
      min: Math.max(nValue.min, startingValues.min),
      max: Math.min(nValue.max, startingValues.max),
    };
    onChange(
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
        role="button"
      >
        <legend className="ccl-form-legend">{facet.title}</legend>
      </div>
      <div className="range-container">
        <Segment basic padded>
          <InputRange
            minValue={startingValues.min}
            maxValue={startingValues.max}
            step={facet.step ? parseInt(facet.step) : 1}
            value={currentValues}
            onChange={onChangeRange}
            formatLabel={(value) =>
              facet.field.value === 'spatial_resolution' ? mToKm(value) : value
            }
          />
        </Segment>
        <br />
      </div>
    </fieldset>
  );
};

const doubleRangeValueToQuery = ({ value, facet }) => {
  if (!value || value.length === 0) return undefined;
  const numericValues = extractNumbers(value).sort((a, b) => a - b);
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
