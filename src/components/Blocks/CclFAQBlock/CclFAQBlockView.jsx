import cx from 'classnames';
import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Segment } from 'semantic-ui-react';

import { getContextNavigation } from '@plone/volto/actions';
import { Icon, UniversalLink } from '@plone/volto/components';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { hasBlocksData, getBaseUrl } from '@plone/volto/helpers';

import { CclTabs } from '@eeacms/volto-clms-theme/components/CclTab';

import penSVG from '@plone/volto/icons/pen.svg';
import config from '@plone/volto/registry';

const flattenCN = (cn_items) =>
  cn_items.reduce(
    (acc, curr) => [
      ...acc,
      curr,
      ...curr.items
        .filter((i) => i.type === 'document')
        .map((item) => ({ ...item, isSubtab: true })),
    ],
    [],
  );

// this is just to highlight that the way CclTabs is working is misleading
// It reads random properties from <div> children, which is unexpected
function Tab(props) {
  return <div {...props} />;
}

const CclFAQBlockView = (props) => {
  const { isEditMode, content } = props;
  const pathname = getBaseUrl(props.pathname || props.path);
  const cn_key = `${pathname}/@contextnavigation`;

  // this are the accordions that are opened
  const [activeIndex, setActiveIndex] = useState([]);

  const dispatch = useDispatch();

  const contextNavigationItems = useSelector(
    (state) =>
      state.contextNavigation?.[cn_key]?.data?.items ||
      content?.['@components']?.['contextnavigation']?.items ||
      [],
  );

  const handleClick = ({ index }) => {
    const newIndex =
      activeIndex.indexOf(index) === -1
        ? [...activeIndex, index]
        : activeIndex.filter((item) => item !== index);

    setActiveIndex(newIndex);
  };

  const flatCN = flattenCN(
    contextNavigationItems?.filter((i) => i.type === 'document') || [],
  );

  React.useEffect(() => {
    isEditMode && dispatch(getContextNavigation(pathname));
  }, [pathname, dispatch, isEditMode]);

  React.useEffect(() => {
    let indexes = (contextNavigationItems || []).reduce(
      (acc, cur) => [
        ...acc,
        ...(cur.items?.length ? [cur.items[0].normalized_id] : []),
        ...cur.items
          ?.map((item) => item.items?.[0]?.normalized_id)
          .filter((id) => !!id),
      ],
      [],
    );
    setActiveIndex(indexes);
  }, [contextNavigationItems]);

  const titleIcons = config.blocks?.blocksConfig?.accordion?.titleIcons;

  return (
    <div id="faq-listing" className="ccl-container tab-container">
      {contextNavigationItems?.length > 0 ? (
        <CclTabs routing={true}>
          {flatCN.map((cn, key) => (
            <Tab
              key={key}
              tabTitle={cn.title}
              className={cx({ subcard: cn.isSubtab })}
              isParent={!!cn.items.filter((i) => i.type === 'document').length}
            >
              <div className="accordion-block">
                {cn.items
                  .filter((item) => item.type === 'faq')
                  .map((item, item_key) => (
                    <Accordion fluid styled key={item_key}>
                      <Accordion.Title
                        as={'h2'}
                        onClick={() =>
                          handleClick({ index: item.normalized_id })
                        }
                        className={'accordion-title align-arrow-right'}
                      >
                        {activeIndex.includes(item.normalized_id) ? (
                          <Icon name={titleIcons.opened.rightPosition} />
                        ) : (
                          <Icon name={titleIcons.closed.rightPosition} />
                        )}
                        {isEditMode && (
                          <UniversalLink
                            openLinkInNewTab={true}
                            href={`${item['@id']}/edit`}
                          >
                            <Icon
                              name={penSVG}
                              className="circled"
                              title={'Edit'}
                            />
                          </UniversalLink>
                        )}
                        <span>{item.title}</span>
                      </Accordion.Title>
                      <Accordion.Content
                        active={activeIndex.includes(item.normalized_id)}
                      >
                        <AnimateHeight
                          animateOpacity
                          duration={500}
                          height={'auto'}
                        >
                          {hasBlocksData(item) && (
                            <RenderBlocks content={item} />
                          )}
                        </AnimateHeight>
                      </Accordion.Content>
                    </Accordion>
                  ))}
              </div>
            </Tab>
          ))}
        </CclTabs>
      ) : (
        <Segment loading={true}></Segment>
      )}
    </div>
  );
};

export default CclFAQBlockView;
