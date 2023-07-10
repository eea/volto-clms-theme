import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Segment } from 'semantic-ui-react';

import { getContextNavigation } from '@plone/volto/actions';
import { Icon, UniversalLink } from '@plone/volto/components';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { hasBlocksData } from '@plone/volto/helpers';
import penSVG from '@plone/volto/icons/pen.svg';
import config from '@plone/volto/registry';
import { CclTabs } from '@eeacms/volto-clms-theme/components/CclTab';
// import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';

const CclFAQBlockView = (props) => {
  const { isEditMode } = props;
  const dispatch = useDispatch();
  const path = useSelector((state) => state.router.location.pathname);
  const contextNavigation = useSelector((state) => state.contextNavigation);
  const cn_key = `${path.replace('/edit', '')}/@contextnavigation`;
  const handleClick = ({ index }) => {
    const newIndex =
      activeIndex.indexOf(index) === -1
        ? [...activeIndex, index]
        : activeIndex.filter((item) => item !== index);

    setActiveIndex(newIndex);
  };

  const flattenCN = (cn_items) => {
    return cn_items.reduce((prev, curr) => {
      prev.push(curr);
      if (curr.items.filter((i) => i.type === 'document').length > 0) {
        curr.items
          .filter((i) => i.type === 'document')
          .forEach((i_i) => prev.push({ ...i_i, isSubtab: true }));
      }
      return prev;
    }, []);
  };
  const flatCN = flattenCN(
    contextNavigation?.[cn_key]?.data?.items
      ? contextNavigation?.[cn_key]?.data?.items.filter(
          (i) => i.type === 'document',
        )
      : [],
  );
  const [activeIndex, setActiveIndex] = useState([]);
  React.useEffect(() => {
    dispatch(getContextNavigation(path.replace('/edit', '')));
  }, [path, dispatch]);
  React.useEffect(() => {
    let indexes = [];
    // eslint-disable-next-line no-unused-expressions
    contextNavigation?.[cn_key]?.data?.items.forEach((i) => {
      if (i.items.length > 0) {
        indexes.push(i.items[0].normalized_id);
      }
    });
    setActiveIndex(indexes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextNavigation?.[cn_key]?.data?.items]);

  const titleIcons = config.blocks?.blocksConfig?.accordion?.titleIcons;

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
                                {/* <StringToHTML
                                  string={item.text ? item.text.data : ''}
                                /> */}
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
