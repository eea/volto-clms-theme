import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { Menu, Tab } from 'semantic-ui-react';
import { RenderBlocks } from '@plone/volto/components';
import { withScrollToTarget } from '@eeacms/volto-tabs-block/hocs';
import { SimpleMarkdown } from '@eeacms/volto-tabs-block/utils';
import './fontawesome';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import '@eeacms/volto-tabs-block/less/menu.less';

const MenuItem = (props) => {
  const { activeTab = null, tabs = {}, setActiveTab = () => {} } = props;
  const { tab, index } = props;
  const title = tabs[tab].title;
  const tabIndex = index + 1;

  const defaultTitle = `Tab ${tabIndex}`;

  return (
    <Menu.Item
      name={defaultTitle}
      active={tab === activeTab}
      className="tabular"
      onClick={() => {
        if (activeTab !== tab) {
          setActiveTab(tab);
        }
      }}
    >
      <span className={'menu-item-count'}>{tabIndex}</span>
      <p className={'menu-item-text'}>{title || defaultTitle}</p>
    </Menu.Item>
  );
};

const CclTabsView = (props) => {
  const [hashlinkOnMount, setHashlinkOnMount] = React.useState(false);
  const {
    metadata = {},
    data = {},
    tabsList = [],
    tabs = {},
    activeTabIndex = 0,
    hashlink = {},
    setActiveTab = () => {},
  } = props;
  const uiContainer = data.align === 'full' ? 'ui container' : '';
  const menuAlign = data.menuAlign || 'left';
  const menuPosition = data.menuPosition || 'inline';
  const tabsTitle = data.title;
  const tabsDescription = data.description;
  // let [activeTab, setActiveTab] = useState(props.children[0].props.tabTitle);

  React.useEffect(() => {
    const urlHash = props.location.hash.substring(1) || '';
    if (
      hashlink.counter > 0 ||
      (hashlink.counter === 0 && urlHash && !hashlinkOnMount)
    ) {
      const id = hashlink.hash || urlHash || '';
      const index = tabsList.indexOf(id);
      const parentId = data.id || props.id;
      const parent = document.getElementById(parentId);
      const headerWrapper = document.querySelector('.header-wrapper');
      const offsetHeight = headerWrapper?.offsetHeight || 0;
      if (id !== parentId && index > -1 && parent) {
        if (activeTabIndex !== index) {
          setActiveTab(id);
        }
        props.scrollToTarget(parent, offsetHeight);
      } else if (id === parentId && parent) {
        props.scrollToTarget(parent, offsetHeight);
      }
    }
    if (!hashlinkOnMount) {
      setHashlinkOnMount(true);
    }
    /* eslint-disable-next-line */
  }, [hashlink.counter]);

  // const panes = tabsList.map((tab, index) => {
  //   return {
  //     id: tab,
  //     menuItem: () => {
  //       return (
  //         <React.Fragment key={`tab-${tab}`}>
  //           {index === 0 && (tabsTitle || tabsDescription) ? (
  //             <Menu.Item className="menu-title">
  //               <SimpleMarkdown md={tabsTitle} defaultTag="##" />
  //               <SimpleMarkdown md={tabsDescription} />
  //             </Menu.Item>
  //           ) : (
  //             ''
  //           )}
  //           <MenuItem {...props} tab={tab} index={index} />
  //         </React.Fragment>
  //       );
  //     },
  //     render: () => {
  //       return (
  //         <Tab.Pane className="tabular">
  //           {' '}
  //           <RenderBlocks {...props} metadata={metadata} content={tabs[tab]} />
  //         </Tab.Pane>
  //       );
  //     },
  //   };
  // });

  const PanelsComponent = () => {
    return (
      <>
        <div class="panels">
          {tabsList.map((tab, index) => {
            const {
              activeTab = null,
              tabs = {},
              setActiveTab = () => {},
            } = props;
            return (
              <div
                className={cx('panel', tab === activeTab && 'panel-selected')}
                id="news_panel"
                role="tabpanel"
                aria-hidden="false"
              >
                <RenderBlocks
                  {...props}
                  metadata={metadata}
                  content={tabs[tab]}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  };
  const TabsComponent = () => {
    return (
      <>
        <div class="tabs" role="tablist">
          {tabsList.map((tab, index) => {
            const {
              activeTab = null,
              tabs = {},
              setActiveTab = () => {},
            } = props;
            // const { tab, index } = props;
            const title = tabs[tab].title;
            const tabIndex = index + 1;

            const defaultTitle = `Tab ${tabIndex}`;
            return (
              <>
                <span
                  class=" "
                  id={tabIndex}
                  role="tab"
                  aria-controls={title || defaultTitle}
                  aria-selected={tab === activeTab}
                  active={tab === activeTab}
                  className={cx('tab', tab === activeTab && 'tab-selected')}
                  onClick={() => {
                    if (activeTab !== tab) {
                      setActiveTab(tab);
                    }
                  }}
                  onKeyDown={() => {
                    if (activeTab !== tab) {
                      setActiveTab(tab);
                    }
                  }}
                  tabIndex="0"
                >
                  {/* <i class="far fa-newspaper"></i>  */}
                  <FontAwesomeIcon
                    icon={['far', 'newspaper']}
                    style={{ marginRight: '1rem' }}
                  />
                  {title || defaultTitle}
                </span>{' '}
              </>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      {/* <Tab
        activeIndex={activeTabIndex}
        className={cx('default tabs', menuPosition, uiContainer)}
        tabular
        menu={{
          className: cx(menuAlign),
        }}
        panes={panes}
      /> */}
      {/* CCLTABS */}
      <div class="ccl-container tab-container">
        <TabsComponent />
        <PanelsComponent />
      </div>
      {/* CCLTABS */}

      {/* <div class="ccl-container tab-container">
        <div class="tabs" role="tablist">
          <span
            class="tab tab-selected"
            id="news_tab"
            role="tab"
            aria-controls="news_panel"
            aria-selected="true"
          >
            <i class="far fa-newspaper"></i>News
          </span>
          <span
            class="tab"
            id="events_tab"
            role="tab"
            aria-controls="events_panel"
            aria-selected="false"
          >
            <i class="far fa-calendar-alt"></i>Events
          </span>
        </div>
        <div class="panels">
          <div
            class="panel panel-selected"
            id="news_panel"
            role="tabpanel"
            aria-hidden="false"
          >
            <div class="card-news">
              <div class="card-news-image">
                <img
                  src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                  alt="Placeholder"
                />
              </div>
              <div class="card-news-text">
                <div class="card-news-title">
                  <a href="./news/news-detail.html">News title</a>
                </div>
                <div class="card-news-date">dd/mm/yyyy</div>
                <p class="card-news-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
            <div class="card-news">
              <div class="card-news-image">
                <img
                  src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                  alt="Placeholder"
                />
              </div>
              <div class="card-news-text">
                <div class="card-news-title">
                  <a href="./news/news-detail.html">News title</a>
                </div>
                <div class="card-news-date">dd/mm/yyyy</div>
                <p class="card-news-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
            <div class="card-news">
              <div class="card-news-image">
                <img
                  src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                  alt="Placeholder"
                />
              </div>
              <div class="card-news-text">
                <div class="card-news-title">
                  <a href="./news/news-detail.html">News title</a>
                </div>
                <div class="card-news-date">dd/mm/yyyy</div>
                <p class="card-news-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
            <a class="ccl-button ccl-button--default" href="./news.html">
              View all news
            </a>
          </div>
          <div
            class="panel"
            id="events_panel"
            role="tabpanel"
            aria-hidden="true"
          >
            <div class="card-event">
              <div class="card-event-image">
                <img
                  src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                  alt="Placeholder"
                />
              </div>
              <div class="card-event-text">
                <div class="card-event-title">
                  <a href="./events/event-detail.html">Event title</a>
                </div>
                <div class="card-event-when">
                  <i class="far fa-calendar-alt"></i>
                  <div class="card-event-when-text">
                    dd/mm/yyyy - dd/mm/yyyy
                  </div>
                </div>
                <div class="card-event-where">
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="card-event-where-text">Virtual</div>
                </div>
                <p class="card-event-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
            <div class="card-event">
              <div class="card-event-image">
                <img
                  src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                  alt="Placeholder"
                />
              </div>
              <div class="card-event-text">
                <div class="card-event-title">
                  <a href="./events/event-detail.html">Event title</a>
                </div>
                <div class="card-event-when">
                  <i class="far fa-calendar-alt"></i>
                  <div class="card-event-when-text">
                    dd/mm/yyyy - dd/mm/yyyy
                  </div>
                </div>
                <div class="card-event-where">
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="card-event-where-text">Virtual</div>
                </div>
                <p class="card-event-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
            <div class="card-event">
              <div class="card-event-image">
                <img
                  src="https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg"
                  alt="Placeholder"
                />
              </div>
              <div class="card-event-text">
                <div class="card-event-title">
                  <a href="./events/event-detail.html">Event title</a>
                </div>
                <div class="card-event-when">
                  <i class="far fa-calendar-alt"></i>
                  <div class="card-event-when-text">
                    dd/mm/yyyy - dd/mm/yyyy
                  </div>
                </div>
                <div class="card-event-where">
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="card-event-where-text">Virtual</div>
                </div>
                <p class="card-event-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
            <a class="ccl-button ccl-button--default" href="./events.html">
              View all events
            </a>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default compose(
  connect((state) => {
    return {
      hashlink: state.hashlink,
    };
  }),
  withScrollToTarget,
)(withRouter(CclTabsView));
