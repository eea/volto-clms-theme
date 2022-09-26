import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { SidebarPortal } from '@plone/volto/components';
import { UseCaseListSchema } from './UseCaseListSchema';
import { getProductGroups } from './utils';
import { searchContent } from '@plone/volto/actions';
import { cclDateTimeFormat } from '@eeacms/volto-clms-theme/components/CclUtils';

const messages = defineMessages({
  xUseCases: {
    id: ' use cases',
    defaultMessage: ' use cases',
  },
});

const CclUseCaseListEdit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    selected,
    id,
    properties,
    metadata,
  } = props;
  const dispatch = useDispatch();
  const intl = useIntl();
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
  const [expanded, setExpanded] = useState('product-token-here');

  function handleTitle(expandedT, productTokenT, setExpandedT) {
    expandedT === productTokenT
      ? setExpandedT('')
      : setExpandedT(productTokenT);
  }
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
            {Object.keys(productGroups).map((productToken) => (
              <div className="use-cases-dropdown">
                <div
                  className="ccl-expandable__button"
                  aria-expanded={expanded === productToken}
                  onClick={() => {
                    handleTitle(expanded, productToken, setExpanded);
                  }}
                  onKeyDown={() => {
                    handleTitle(expanded, productToken, setExpanded);
                  }}
                  role="button"
                  tabIndex="0"
                >
                  {productGroups[productToken].title}
                </div>
                <div className="use-cases-element-container">
                  {productGroups[productToken].useCases.map((useCase) => (
                    <div className="use-cases-element">
                      <div className="use-case-element-title">
                        {useCase.title}
                      </div>
                      <div className="use-case-element-description">
                        {/* <span>
                          {useCase.topics.map((topic) => topic.title)}
                        </span> */}
                        <span>{cclDateTimeFormat(useCase?.effective)}</span>
                        <span>{useCase.responsibleOrganization}</span>
                      </div>
                    </div>
                  ))}
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
      <SidebarPortal selected={selected}>
        <InlineForm
          schema={UseCaseListSchema()}
          title="UseCase List block"
          onChangeField={(idCase, value) => {
            onChangeBlock(block, {
              ...data,
              [idCase]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default CclUseCaseListEdit;
