import React from 'react';

const HistoricHOC = (CLMSDownloadsView) =>
  function Component(props) {
    return <CLMSDownloadsView {...props} {...{ historicView: true }} />;
  };
export default HistoricHOC;
