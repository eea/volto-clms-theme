import 'react-input-range/lib/css/index.css';
import './range.css';

import React from 'react';

import InputRange from 'react-input-range';
import { Segment } from 'semantic-ui-react';
import {
  selectFacetStateToValue,
  selectFacetValueToQuery,
} from '@plone/volto/components/manage/Blocks/Search/components/base';

const doubleRangeFacetSchemaEnhancer = ({ schema, formData }) => {
  // adds (enables) the 'multiple' field after the 'type' dropdown
  let { fields } = schema.fieldsets[0];
  const pos = fields.indexOf('type') + 1;
  fields = [
    ...fields.slice(0, pos),
    'step',
    'multiple',
    ...fields.slice(pos, fields.length),
  ];

  schema.properties = {
    ...schema.properties,
    step: { title: 'Step', type: 'number', default: 1 },
  };
  schema.fieldsets[0].fields = fields;
  return schema;
};

const DoubleRangeFacet = (props) => {
  const { facet, choices, onChange, value } = props;
  const facetValue = value;
  var [open, setOpen] = React.useState(false);

  const convertToRange = (values) => {
    return {
      min: Math.min.apply(
        Math,
        values.map(function (o) {
          return o.value.replace(/[a-zA-Z]/, '');
        }),
      ),
      max: Math.max.apply(
        Math,
        values.map(function (o) {
          return o.value.replace(/[a-zA-Z]/, '');
        }),
      ),
    };
  };

  const startingValues = convertToRange(choices);

  // const [rangeValues, setRangeValues] = useState(startingValues);

  const onChangeRange = (rValue, onChangeR, sValue) => {
    const fixedValue = {
      min: rValue.min < sValue.min ? sValue.min : rValue.min,
      max: rValue.max > sValue.max ? sValue.max : rValue.max,
    };
    // setRangeValues(fixedValue);
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
      <div>
        <Segment basic padded>
          <InputRange
            minValue={startingValues.min}
            maxValue={startingValues.max}
            step={facet.step || 1}
            value={
              facetValue.length > 0
                ? convertToRange(facetValue)
                : startingValues
            }
            onChange={(changedValue) =>
              onChangeRange(changedValue, onChange, startingValues)
            }
          />
        </Segment>
        <br />
      </div>
    </fieldset>
  );
};

DoubleRangeFacet.schemaEnhancer = doubleRangeFacetSchemaEnhancer;
DoubleRangeFacet.stateToValue = selectFacetStateToValue;
DoubleRangeFacet.valueToQuery = selectFacetValueToQuery;
export default DoubleRangeFacet;
