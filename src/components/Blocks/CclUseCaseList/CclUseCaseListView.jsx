import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { getProductGroups } from './utils';
import { searchContent } from '@plone/volto/actions';

const messages = defineMessages({
  xUseCases: {
    id: ' use cases',
    defaultMessage: ' use cases',
  },
});

const CclUseCaseListView = (props) => {
  const { data, id, properties, metadata } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const path = metadata ? metadata['@id'] : properties['@id'];
  let useCases = searchSubrequests?.[props.id]?.items || [];

  React.useEffect(() => {
    dispatch(
      searchContent(
        path,
        {
          fullobjects: 1,
          portal_type: 'UseCase',
        },
        id,
      ),
    );
  }, [path, data, id, dispatch]);
  let productGroups = getProductGroups(useCases);
  const [expanded, setExpanded] = useState([]);
  return (
    <>
      <div className="ccl-container">
        <div className="use-cases-block">
          <h2>{data.title || 'Custom block title'}</h2>
        </div>
      </div>
      <div className="ccl-container ccl-container-flex">
        <div className="use-cases-products-block cont-w-50">
          <div className="use-cases-products-title">
            <span>{useCases.length}</span>
            {intl.formatMessage(messages.xUseCases)}
          </div>
          <div className="use-cases-products-list">
            {Object.keys(productGroups).map((productToken, index) => (
              <div key={index} className="use-cases-dropdown">
                <div
                  className="ccl-expandable__button"
                  aria-expanded={expanded.includes(productToken)}
                  onClick={() => {
                    if (expanded.includes(productToken)) {
                      let newExpanded = expanded.slice();
                      newExpanded.splice(newExpanded.indexOf(productToken), 1);
                      setExpanded(newExpanded);
                    } else {
                      setExpanded([...expanded, productToken]);
                    }
                  }}
                  onKeyDown={() => {
                    if (expanded.includes(productToken)) {
                      let newExpanded = expanded.slice();
                      newExpanded.splice(newExpanded.indexOf(productToken), 1);
                      setExpanded(newExpanded);
                    } else {
                      setExpanded([...expanded, productToken]);
                    }
                  }}
                  role="button"
                  tabIndex="0"
                >
                  {productGroups[productToken].title}
                </div>
                <div className="use-cases-element-container">
                  {productGroups[productToken].useCases.map(
                    (useCase, indexCase) => (
                      <div key={indexCase} className="use-cases-element">
                        <div className="use-case-element-title">
                          {useCase.title}
                        </div>
                        <div className="use-case-element-description">
                          <span>
                            {useCase.topics.map((topic) => topic.title)}
                          </span>
                          <span>
                            {new Date(useCase?.effective).toLocaleDateString()}
                          </span>
                          <span>{useCase.responsibleOrganization}</span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="use-cases-products-block cont-w-50">
          <div className="use-cases-products-title">Organisation locations</div>
          <div className="use-cases-products-map">
            <div className="use-cases-map-container"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CclUseCaseListView;
