import React from 'react';
import { slugify } from '../../utils';

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
      const tabsDict = Object.entries(rTabs).map((t) => {
        return { title: t[1].title, id: t[0] };
      });
      // Deprecated, now we use tab title to set the hash
      // if (
      //   window.location.hash.match(/.*&?#?tab=(.*)/) &&
      //   window.location.hash.match(/.*&?#?tab=(.*)/).length > 1
      // ) {
      //   return rTabsList[window.location.hash.match(/.*&?#?tab=(.*)/)[1] - 1];
      // }
      if (
        window.location.hash.match(/.*&?(#.*)/) &&
        window.location.hash.match(/.*&?(#.*)/).length > 1
      ) {
        const hashMatch = window.location.hash
          .match(/.*&?(#.*)/)[1]
          .replace('#', '');
        const result = tabsDict.filter((t) => slugify(t.title) === hashMatch);
        return result[0].id;
      }
    }
    React.useEffect(() => {
      const isReload =
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
