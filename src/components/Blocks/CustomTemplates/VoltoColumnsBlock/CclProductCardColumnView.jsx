import React from 'react';
import { useLocation } from 'react-router-dom';
import config from '@plone/volto/registry';
import { Grid } from 'semantic-ui-react';
import { RenderBlocks } from '@plone/volto/components';
import { COLUMNSBLOCK } from '@eeacms/volto-columns-block/constants';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

import { getColumns } from './utils';
import { getStyle } from '@eeacms/volto-columns-block/Styles';

import BioGeoPhysicalImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_biogeophysical_green_bg.svg';
import GroundMotionImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_groundmotion_green_bg.svg';
import LandCoverImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_landcover_green_bg.svg';
import PriorityAreaImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_priorityarea_green_bg.svg';
import ReferenceAndValidationImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_referenceandvalidation_green_bg.svg';
import SatelliteImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_satellite_green_bg.svg';

import { ReactSVG } from 'react-svg';

const CclProductCardColumnView = (props) => {
  const location = useLocation();
  const { gridSizes } = config.blocks.blocksConfig[COLUMNSBLOCK];
  const { data = {}, gridSize = 12, gridCols = [] } = props.data;
  const metadata = props.metadata || props.properties;
  const columnList = getColumns(data);
  const customId = props.data?.title
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z-\s]/gi, '')
    ?.trim()
    ?.replace(/\s+/gi, '-');

  const flattenUrl = flattenToAppURL(
    columnList[0][1].settings?.href?.[0]?.['@id'],
  );

  return (
    <div className="columns-view product-columns-view" id={customId}>
      <Grid
        columns={gridSize}
        className={
          props.data.reverseWrap ? 'column-grid reverse-wrap' : 'column-grid'
        }
      >
        {columnList.map(([id, column], index) => {
          return (
            <Grid.Column
              key={id}
              {...(gridSizes[gridCols[index]] || gridCols[index])}
              className={cx(
                'column-blocks-wrapper',
                column.settings?.column_class,
              )}
              {...getStyle(column.settings || {})}
            >
              {id === columnList[0][0] && (
                <span className="product-card-column-header">
                  <div className="product-card-column-image">
                    {columnList[0][1].settings.productIcon ===
                    'Landscape green bg' ? (
                      <ReactSVG src={LandCoverImage} />
                    ) : columnList[0][1].settings.productIcon ===
                      'Warning green bg' ? (
                      <ReactSVG src={PriorityAreaImage} />
                    ) : columnList[0][1].settings.productIcon ===
                      'Leaf green bg' ? (
                      <ReactSVG src={BioGeoPhysicalImage} />
                    ) : columnList[0][1].settings.productIcon ===
                      'Computer green bg' ? (
                      <ReactSVG src={GroundMotionImage} />
                    ) : columnList[0][1].settings.productIcon ===
                      'Database green bg' ? (
                      <ReactSVG src={ReferenceAndValidationImage} />
                    ) : columnList[0][1].settings.productIcon ===
                      'Satellite green bg' ? (
                      <ReactSVG src={SatelliteImage} />
                    ) : (
                      ''
                    )}
                  </div>
                  <CclButton url={flattenUrl} className="product-card-title">
                    {columnList[0][1].settings.title}
                  </CclButton>
                </span>
              )}
              <RenderBlocks
                {...props}
                location={location}
                metadata={metadata}
                content={column}
              />
            </Grid.Column>
          );
        })}
      </Grid>
    </div>
  );
};

export default CclProductCardColumnView;
