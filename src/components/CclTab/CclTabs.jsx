import React, { useState } from 'react';

import CclTab from './CclTab';
import PropTypes from 'prop-types';
import { slugify } from '../Blocks/utils';

/**
 * Tabs component documentation.
 * @function CclTabs
 * @param {Node} children Content object.
 * @example <CclTabs routing={true}>
        <div tabTitle="Dataset Info">Tab content 1</div>
        <div tabTitle="Metadata">Tab content 2</div>
        <div tabTitle="Download dataset" redirect="some-href-link">Tab content 3</div>

        <div underPanel={true}>
          // Any content under tabs
        </div>
      </CclTabs>
 *
 */
const CclTabs = (props) => {
  let { children, routing = false } = props;
  let [activeTab, setActiveTab] = useState(
    children?.length > 0
      ? children[0].props.tabId || slugify(children[0].props.tabTitle)
      : '',
  );

  function onClickTabItem(tab) {
    setActiveTab(tab);
  }
  const possible_hashes = children
    .flat()
    .map((child) => slugify(child?.props?.tabTitle));
  React.useEffect(() => {
    const hash = window.location.hash.substring(1) || '';
    const firstTab = children.filter((item) => !!item?.props?.tabTitle)[0];
    if (routing) {
      if (hash.startsWith('b_size')) {
        setActiveTab(slugify(firstTab.props?.tabTitle));
      } else if (hash) {
        if (possible_hashes.includes(hash)) setActiveTab(hash);
      } else if (
        children.filter((item) => !!item?.props?.tabTitle).length > 1 &&
        firstTab.props?.parent
      ) {
        setActiveTab(
          slugify(
            children.filter((item) => !!item?.props?.tabTitle)[1].props
              ?.tabTitle,
          ),
        );
      } else {
        if (firstTab) setActiveTab(slugify(firstTab.props?.tabTitle));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, routing]);

  return (
    <div className="ccl-container-flex">
      <div className="left-content cont-w-25">
        <nav className="left-menu">
          {children
            .flat()
            .filter((item) => !!item?.props?.tabTitle)
            .map((child, key) => {
              const { tabTitle, redirect } = child.props;
              const tabId = slugify(tabTitle);
              let hasSubtab = false;
              const currentTab = children.filter(
                (item) => slugify(item?.props?.tabTitle) === tabId,
              )[0];
              if (currentTab?.props?.parent) {
                hasSubtab = true;
              }
              return (
                <CclTab
                  activeTab={activeTab}
                  key={key}
                  routing={routing}
                  tabId={tabId}
                  tabTitle={tabTitle}
                  onClick={onClickTabItem}
                  redirect={redirect}
                  hasSubtab={hasSubtab}
                  {...child.props}
                />
              );
            })}
        </nav>

        {/* Check if underPanel element exist and render */}
        {children
          .flat()
          .filter((item) => !!item?.props?.underPanel)
          .map((child) => {
            const { children } = child.props;
            return children;
          })}
      </div>

      <div className="right-content cont-w-75">
        <div className="tab-content">
          {children
            .flat()
            .filter((item) => !!item?.props?.tabTitle)
            .map((child, index) => {
              return slugify(child.props?.tabTitle) !== activeTab ? (
                <div key={index} className="deactivate-content">
                  {child.props.children}
                </div>
              ) : (
                child.props.children
              );
            })}
        </div>
      </div>
    </div>
  );
};

CclTabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};
export default CclTabs;
