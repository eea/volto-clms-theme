import React from 'react';

const RoutingHOC = (TabView) =>
  function Component(props) {
    const [hashlinkOnMount, setHashlinkOnMount] = React.useState(false);
    const {
      data = {},
      tabsList = [],
      activeTabIndex = 0,
      hashlink = {},
      setActiveTab = () => {},
    } = props;
    React.useEffect(() => {
      const urlHash = window.location.hash.substring(1) || '';
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
      if (
        String(window.performance.getEntriesByType('navigation')[0].type) ===
          'navigate' ||
        String(window.performance.getEntriesByType('navigation')[0].type) ===
          'reload'
      ) {
        if (window.location.hash.length === 0) {
          setActiveTab(tabsList[0]);
        } else {
          setActiveTab(tabsList[window.location.hash.substring(4) - 1]);
        }
      }
    }, [
      activeTabIndex,
      data.id,
      hashlink.counter,
      hashlink.hash,
      hashlinkOnMount,
      props,
      setActiveTab,
      tabsList,
    ]);

    return <TabView {...props} />;
  };

export default RoutingHOC;
