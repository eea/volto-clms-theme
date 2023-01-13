import React from 'react';
import { CclTabs } from '@eeacms/volto-clms-theme/components/CclTab';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import config from '@plone/volto/registry';
import { Accordion, Segment } from 'semantic-ui-react';
import { Icon, UniversalLink } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import { StringToHTML } from '@eeacms/volto-clms-theme/components/CclUtils';
import penSVG from '@plone/volto/icons/pen.svg';

const CclFAQBlockView = (props) => {
  const { isEditMode } = props;
  const dispatch = useDispatch();
  const path = useSelector((state) => state.router.location.pathname);
  const search = useSelector((state) => state.search);
  const handleClick = ({ index }) => {
    const newIndex =
      activeIndex.indexOf(index) === -1
        ? [...activeIndex, index]
        : activeIndex.filter((item) => item !== index);

    setActiveIndex(newIndex);
  };
  React.useEffect(() => {
    dispatch(
      searchContent(path.replace('/edit', ''), {
        fullobjects: 1,
        portal_type: 'FAQ',
        b_size: 999,
      }),
    );
  }, [path, dispatch]);
  React.useEffect(() => {
    if (search.loaded) {
      const firstOfCategories = categories.map((cat, key, self) => {
        const cat_indexes = search.items.reduce((filtered, item, index) => {
          if (filtered.UID) {
            filtered = [];
          }
          if (
            item.taxonomy_faqcategories.filter((item_cat) =>
              item_cat.title.includes(cat.title),
            ).length > 0
          ) {
            if (index === 1) {
              filtered.push(0);
            } else {
              filtered.push(index);
            }
          }
          return filtered;
        });
        return cat_indexes.length > 0 ? cat_indexes[0] : 0;
      });
      setActiveIndex(firstOfCategories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  let categories =
    search.items.length > 0
      ? [
          ...new Set(
            search.items.map((item) => item.taxonomy_faqcategories).flat(),
          ),
        ]
          .map((cat) => {
            const cat_family = cat.title?.split(' » ');
            if (cat_family.length > 1) {
              cat['subTab'] = true;
            }
            return cat;
          })
          .filter(
            (thing, index, self) =>
              index === self.findIndex((t) => t.token === thing.token),
          )
          .sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            } else if (a.title > b.title) {
              return 1;
            }
            return 0;
          })
      : [];
  categories.forEach((cat, index) => {
    if (cat.subTab && !categories[index - 1].subTab) {
      categories[index - 1]['parent'] = true;
    }
  });
  const titleIcons = config.blocks?.blocksConfig?.accordion?.titleIcons;

  const [activeIndex, setActiveIndex] = React.useState([0]);
  return (
    <div id="faq-listing" className="ccl-container tab-container">
      {search.loaded ? (
        search.items?.length > 0 &&
        categories.length > 0 && (
          <CclTabs routing={true}>
            {categories.map((cat, key) => {
              const cat_family = cat.title.split(' » ');
              const cat_title =
                cat_family.length > 1
                  ? cat_family[1].split('#')[1]
                  : cat_family[0].split('#')[1];
              return (
                <div
                  key={key}
                  tabTitle={cat_title}
                  className={cat_family.length > 1 ? 'subcard' : ''}
                  parent={cat.parent}
                >
                  <div className="accordion-block">
                    {search.items.map((item, item_key) => {
                      return (
                        item.taxonomy_faqcategories.filter((faq_cat) =>
                          faq_cat.title.includes(cat.title),
                        ).length > 0 && (
                          <Accordion fluid styled key={item_key}>
                            <Accordion.Title
                              as={'h2'}
                              onClick={() => handleClick({ index: item_key })}
                              className={'accordion-title align-arrow-right'}
                            >
                              {activeIndex.includes(item_key) ? (
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
                              active={activeIndex.includes(item_key)}
                            >
                              <AnimateHeight
                                animateOpacity
                                duration={500}
                                height={'auto'}
                              >
                                <StringToHTML
                                  string={item.text ? item.text.data : ''}
                                />
                              </AnimateHeight>
                            </Accordion.Content>
                          </Accordion>
                        )
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </CclTabs>
        )
      ) : (
        <Segment loading={search.loading}></Segment>
      )}
    </div>
  );
};

export default CclFAQBlockView;
