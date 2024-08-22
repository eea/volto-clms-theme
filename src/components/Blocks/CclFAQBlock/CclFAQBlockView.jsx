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

const CclFAQBlockView = (props) => {
  const { isEditMode } = props;
  const pathname = getBaseUrl(props.pathname || props.path);
  const cn_key = `${pathname}/@contextnavigation`;

  // this are the accordions that are opened
  const [activeIndex, setActiveIndex] = useState([]);

  const dispatch = useDispatch();
  const contextNavigation = useSelector((state) => state.contextNavigation);

  const handleClick = ({ index }) => {
    const newIndex =
      activeIndex.indexOf(index) === -1
        ? [...activeIndex, index]
        : activeIndex.filter((item) => item !== index);

    setActiveIndex(newIndex);
  };

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

  const flatCN = flattenCN(
    contextNavigation?.[cn_key]?.data?.items?.filter(
      (i) => i.type === 'document',
    ) || [],
  );

  React.useEffect(() => {
    dispatch(getContextNavigation(pathname));
  }, [pathname, dispatch]);

  const contextNavigationItems = contextNavigation?.[cn_key]?.data?.items;

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

  // console.log('indexes', activeIndex);
  // console.log(flatCN);

  return (
    <div id="faq-listing" className="ccl-container tab-container">
      {contextNavigation?.[cn_key]?.loaded ? (
        contextNavigation?.[cn_key]?.data?.items?.length > 0 && (
          <CclTabs routing={true}>
            {flatCN
              .filter((cn) => cn.type === 'document')
              .map((cn, key) => (
                <div
                  key={key}
                  tabTitle={cn.title}
                  className={
                    cn.isSubtab
                      ? 'subcard'
                      : cn.items.filter((i) => i.type === 'document').length > 0
                  }
                  parent={
                    cn.items.filter((i) => i.type === 'document').length > 0
                  }
                >
                  <div className="accordion-block">
                    {cn.items
                      .filter((item) => item.type === 'faq')
                      .map((item, item_key) => {
                        return (
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
                        );
                      })}
                  </div>
                </div>
              ))}
          </CclTabs>
        )
      ) : (
        <Segment loading={contextNavigation?.[cn_key]?.loading}></Segment>
      )}
    </div>
  );
};

export default CclFAQBlockView;
