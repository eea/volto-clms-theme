/**
 * CLMSMapViewView container.
 * @module components/CLMSMapViewView/CLMSMapViewView
 */

import React, { useEffect } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { MapViewer } from '@eeacms/volto-arcgis-block/components';
import config from '@eeacms/volto-arcgis-block/components/MapViewer/config';
import { useDispatch } from 'react-redux';
import { getExtraBreadcrumbItems } from '../../actions';
import { getBaseUrl } from '@plone/volto/helpers';
const CLMSMapViewerView = (props) => {
  const dispatch = useDispatch();

  const { formatMessage } = useIntl();
  const messages = defineMessages({
    DownloadByArea: {
      id: 'DownloadByArea',
      defaultMessage: 'Download by area',
    },
  });

  useEffect(() => {
    dispatch(
      getExtraBreadcrumbItems([
        {
          title: formatMessage(messages.DownloadByArea),
          pathname: props.location.pathname,
        },
      ]),
    );

    // returned function will be called on component unmount
    return () => {
      dispatch(getExtraBreadcrumbItems([]));
    };
  }, [
    dispatch,
    formatMessage,
    messages.DownloadByArea,
    props.location.pathname,
  ]);

  const config_by_area = {
    ...config,
    DownloadByArea: true,
    Components: [
      // Area Information
      {
        ComponentTitle: 'Custom detail element',
        Products: [
          {
            ProductTitle: 'Test detail',
            Datasets: [
              {
                DatasetId: 'copernicus_v_3035_10_m_cz-2012_p_2010-2014_v01_r00',
                DatasetTitle: 'Coastal Zones 2012',
                DatasetDescription:
                  'The Coastal Zones (CZ) LC/LU product for 2012 is providing a detailed Land Cover / Land Use (LC/ LU) dataset for areas along the coastline of the EEA38 countries and the United Kingdom, with reference year 2012 for the classification. This product monitors landscape dynamics in European coastal territory to an inland depth of 10 km with a total area of approximately 730,000 km², with all the relevant areas (estuaries, coastal lowlands, nature reserves). The production of the coastal zone layers was coordinated by the European Environment Agency (EEA) in the frame of the EU Copernicus programme, as part of the Copernicus Land Monitoring Service (CLMS) Local Component.The Coastal Zones product covers a buffer zone of coastline derived from EU-Hydro v1.1. Land Cover/Land Use (LC/LU) layer is extracted from Very High Resolution (VHR) satellite data and other available data. The class definitions follow the pre-defined nomenclature on the basis of Mapping and Assessment of Ecosystems and their Services (MAES) typology of ecosystems (Level 1 to Level 4) and CORINE Land Cover adapted to the specific characteristics of coastal zones. The classification provides 71 distinct thematic classes with a Minimum Mapping Unit (MMU) of 0.5 ha and a Minimum Mapping Width (MMW) of 10 m. The product is available for the 2012 and 2018 reference year including change mapping.This CZ dataset is distributed in vector format, in a single OGC GeoPackage SQLite file covering the area of interest.',
                ViewService:
                  'https://image.discomap.eea.europa.eu/arcgis/services/CoastalZones/CZ_CoastalZones_2012/MapServer/WmsServer?',
                Layer: [
                  {
                    LayerId: 'Coastal_Zones_2012_vector53031',
                    Title: 'Coastal Zones 2012 vector',
                  },
                  {
                    LayerId: 'Coastal_Zones_2012_raster55645',
                    Title: 'Coastal Zones 2012 raster',
                  },
                ],
                DownloadService: 'EEA',
                DownloadType: 'ESRI REST service',
                IsTimeSeries: false,
                TimeSeriesService: '',
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="ccl-container ">
      <h1>aaaaaaaaaaaaaaaaaaaaaaa</h1>
      <Helmet title={formatMessage(messages.DownloadByArea)} />
      <MapViewer
        cfg={config_by_area}
        url={getBaseUrl(props.location.pathname)}
        customClass={'land'}
        id={props.location.pathname}
      ></MapViewer>
    </div>
  );
};

export default CLMSMapViewerView;
