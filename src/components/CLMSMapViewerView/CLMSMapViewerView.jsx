/**
 * CLMSMapViewView container.
 * @module components/CLMSMapViewView/CLMSMapViewView
 */

import React from 'react';
import { Helmet } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { MapViewer } from '@eeacms/volto-arcgis-block/components';
import config from '@eeacms/volto-arcgis-block/components/MapViewer/config';

const CLMSMapViewerView = (props) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    DownloadByArea: {
      id: 'DownloadByArea',
      defaultMessage: 'Download by area',
    },
  });

  const config_by_area = {
    ...config,
    DownloadByArea: true,
    Components: [
      // Area Information
      {
        ComponentTitle: 'Custom elements',
        Products: [],
      },
    ],
  };

  return (
    <div>
      <Helmet title={formatMessage(messages.DownloadByArea)} />
      <MapViewer
        cfg={config_by_area}
        customClass={'land'}
        id={props.location.pathname}
      ></MapViewer>
    </div>
  );
};

export default CLMSMapViewerView;
