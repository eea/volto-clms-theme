import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { ReactSVG } from 'react-svg';
import { compose } from 'redux';

import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import BioGeoPhysicalImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_biogeophysical.svg';
import GroundMotionImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_groundmotion.svg';
import LandCoverImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_landcover.svg';
import PriorityAreaImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_priorityarea.svg';
import ReferenceAndValidationImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_referenceandvalidation.svg';
import SatelliteImage from '@eeacms/volto-clms-theme/../theme/clms/img/i_satellite.svg';

import { HomeProductsSchema, ProductSchema } from './HomeProductsSchema';
import './styles.less';
import { emptyProduct, getPanels } from './utils';

import { isEmpty } from 'lodash';

const CclHomeProductsBlockEdit = (props) => {
  const { block, data, onChangeBlock, selected } = props;
  const properties = isEmpty(data?.products?.blocks)
    ? emptyProduct(6)
    : data.products;

  const panelData = properties;
  const panels = getPanels(panelData);
  React.useEffect(() => {
    if (isEmpty(data?.products)) {
      onChangeBlock(block, {
        ...data,
        products: {
          ...properties,
        },
      });
    }
    /* eslint-disable-next-line */
  }, []);
  const [selectedProductBlock, setSelectedProductBlock] = useState(-1);
  React.useEffect(() => {
    if (!selected) {
      setSelectedProductBlock(-1);
    }
  }, [selected]);
  return (
    <>
      <div
        className="homeProducts-header"
        onClick={() => {
          props.setSidebarTab(1);
          setSelectedProductBlock(-1);
        }}
        aria-hidden="true"
      >
        {data.title || 'Home Products band'}
      </div>
      <div className="home-products-container">
        {panels?.map(([uid, panel], index) => (
          <div
            key={index}
            className={
              panel.productIcon === 'iconless'
                ? 'home-product home-product-main'
                : 'home-product'
            }
            id={panel.productIcon === 'iconless' ? '' : panel.productIcon}
            onClick={() => {
              setSelectedProductBlock(uid);
            }}
            onKeyDown={() => {
              setSelectedProductBlock(uid);
            }}
            role="button"
            tabIndex="0"
          >
            {panel.productIcon === 'iconless' ? (
              <h3>{panel.title}</h3>
            ) : (
              <>
                <div className="home-product-image">
                  {panel.productIcon === 'Landscape' ? (
                    <ReactSVG src={LandCoverImage} />
                  ) : panel.productIcon === 'Warning' ? (
                    <ReactSVG src={PriorityAreaImage} />
                  ) : panel.productIcon === 'Leaf' ? (
                    <ReactSVG src={BioGeoPhysicalImage} />
                  ) : panel.productIcon === 'Computer' ? (
                    <ReactSVG src={GroundMotionImage} />
                  ) : panel.productIcon === 'Database' ? (
                    <ReactSVG src={ReferenceAndValidationImage} />
                  ) : panel.productIcon === 'Satellite' ? (
                    <ReactSVG src={SatelliteImage} />
                  ) : (
                    ''
                  )}
                </div>
                <div className="home-product-title">{panel.title}</div>
                <div className="home-product-description">
                  {panel.description}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <SidebarPortal selected={selected && selectedProductBlock === -1}>
        <InlineForm
          schema={HomeProductsSchema()}
          title="Home products block"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
      <SidebarPortal
        selected={selected && data.products?.blocks[selectedProductBlock]}
      >
        <InlineForm
          schema={ProductSchema()}
          title="Product"
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              products: {
                ...data.products,
                blocks: {
                  ...data.products.blocks,
                  [selectedProductBlock]: {
                    ...data.products.blocks[selectedProductBlock],
                    [id]: value,
                  },
                },
              },
            });
          }}
          formData={data.products?.blocks[selectedProductBlock]}
        />
      </SidebarPortal>
    </>
  );
};
export default compose(withObjectBrowser, injectIntl)(CclHomeProductsBlockEdit);
