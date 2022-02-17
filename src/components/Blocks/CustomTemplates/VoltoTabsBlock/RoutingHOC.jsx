import React from 'react';

const RoutingHOC = (TabView) =>
  function Component(props) {
    const { tabsList = [], tabs, activeTabIndex = 0, setActiveTab } = props;
    function reloadTab(window, rTabs, rTabsList) {
      if (
        window.location.hash.length === 0 &&
        rTabs[rTabsList[1]]?.subTab?.subtab &&
        !rTabs[rTabsList[0]]?.subTab?.subtab
      ) {
        return rTabsList[1];
      } else if (
        window.location.hash.length === 0 &&
        !rTabs[rTabsList[1]]?.subTab?.subtab
      ) {
        return rTabsList[0];
      }
      return rTabsList[window.location.hash.match(/.*&?#?tab=(.*)/)[1] - 1];
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
