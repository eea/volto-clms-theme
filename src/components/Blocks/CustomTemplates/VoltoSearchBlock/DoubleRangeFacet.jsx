import 'react-input-range/lib/css/index.css';
import './range.css';

import React, { useState } from 'react';

import InputRange from 'react-input-range';
import { Segment } from 'semantic-ui-react';
import {
  selectFacetSchemaEnhancer,
  selectFacetStateToValue,
  selectFacetValueToQuery,
} from '@plone/volto/components/manage/Blocks/Search/components/base';

const DoubleRangeFacet = (props) => {
  const { facet, choices, onChange, value } = props;
  const facetValue = value;
  var [open, setOpen] = React.useState(false);

  const convertToRange = (values) => {
    return {
      min: Math.min.apply(
        Math,
        values.map(function (o) {
          return o.value;
        }),
      ),
      max: Math.max.apply(
        Math,
        values.map(function (o) {
          return o.value;
        }),
      ),
    };
  };

  const startingValues = convertToRange(choices);

  const [rangeValues, setRangeValues] = useState(startingValues);

  const onChangeRange = (rValue, onChangeR) => {
    setRangeValues(rValue);
    onChangeR(
      facet.field.value,
      [...Array(rValue.max - rValue.min + 1).keys()].map((i) =>
        (i + rValue.min).toString(),
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
        <legend className="ccl-form-legend">
          {facet.title} {startingValues.min} - {startingValues.max}
        </legend>
      </div>
      <div>
        <Segment basic padded>
          <InputRange
            minValue={startingValues.min}
            maxValue={startingValues.max}
            value={
              facetValue.length > 0 ? convertToRange(facetValue) : rangeValues
            }
            onChange={(changedValue) => onChangeRange(changedValue, onChange)}
          />
        </Segment>
        <br />
      </div>
    </fieldset>
  );
};

DoubleRangeFacet.schemaEnhancer = selectFacetSchemaEnhancer;
DoubleRangeFacet.stateToValue = selectFacetStateToValue;
DoubleRangeFacet.valueToQuery = selectFacetValueToQuery;
export default DoubleRangeFacet;
