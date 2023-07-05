import React from 'react';
import { slugify } from '../../utils';
import { useSelector } from 'react-redux';

const decideTabSubtab = (tabs, option1, option2) => {
  if (!option2) {
    return option1;
  }
  if (!tabs[option1]?.subTab?.subtab && tabs[option2]?.subTab?.subtab) {
    return option2;
  } else if (!tabs[option2]?.subTab?.subtab) {
    return option1;
  }
  return option1;
};

const RoutingHOC = (TabView) =>
  function Component(props) {
    const { tabsList = [], tabs, activeTabIndex = 0, setActiveTab } = props;
    const location = useSelector((state) => state.router.location);

    function reloadTab(window, rTabs, rTabsList) {
      const tabsDict = Object.entries(rTabs).map((t) => {
        return { title: t[1].title, id: t[0] };
      });
      if (
        window.location.search.match(/.*([&|?|#]tab=.*)/) &&
        window.location.search.match(/.*([&|?|#]tab=.*)/).length > 1
      ) {
        const hashMatch = window.location.search
          .match(/.*([&|?|#]tab=.*)/)[1]
          .replace(/[&|?|#]tab=/, '');
        const result = tabsDict.filter((t) => slugify(t.title) === hashMatch);
        if (result.length > 0) {
          return result[0].id;
        }
      }
      return decideTabSubtab(rTabs, rTabsList[0], rTabsList[1]);
    }

    React.useEffect(() => {
      const isReload =
        String(window.performance.getEntriesByType('navigation')[0].type) ===
          'navigate' ||
        String(window.performance.getEntriesByType('navigation')[0].type) ===
          'reload';
      if (isReload) {
        const existingTab = reloadTab(window, tabs, tabsList);
        if (existingTab) setActiveTab(existingTab);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTabIndex, location]);

    return <TabView {...props} />;
  };

export default RoutingHOC;
