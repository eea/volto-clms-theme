import React from 'react';

const RoutingHOC = (TabView) =>
  function Component(props) {
    const { tabsList = [], tabs, activeTabIndex = 0, setActiveTab } = props;
    function reloadTab(window, tabs, tabsList) {
      if (
        window.location.hash.length === 0 &&
        tabs[tabsList[1]]?.subTab?.subtab &&
        !tabs[tabsList[0]]?.subTab?.subtab
      ) {
        return tabsList[1];
      } else if (
        window.location.hash.length === 0 &&
        !tabs[tabsList[1]]?.subTab?.subtab
      ) {
        return tabsList[0];
      }
      return tabsList[window.location.hash.substring(4) - 1];
    }
    React.useEffect(() => {
      const isReload =
        String(window.performance.getEntriesByType('navigation')[0].type) ===
          'navigate' ||
        String(window.performance.getEntriesByType('navigation')[0].type) ===
          'reload';
      if (isReload) {
        setActiveTab(reloadTab(window, tabs, tabsList));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTabIndex]);

    return <TabView {...props} />;
  };

export default RoutingHOC;
