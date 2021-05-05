import React, { useState } from 'react';

import { HomeProductsSchema, ProductSchema } from './HomeProductsSchema';
import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import { isEmpty } from 'lodash';
import { emptyProduct, getPanels } from './utils';

import { compose } from 'redux';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { injectIntl } from 'react-intl';
import './styles.less';

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
  const [selectedBlock, setSelectedBlock] = useState(-1);
  React.useEffect(() => {
    if (!selected) {
      setSelectedBlock(-1);
    }
  }, [selected]);
  //   console.log(data)
  return (
    <>
      <div
        className="homeProducts-header"
        onClick={() => {
          props.setSidebarTab(1);
          setSelectedBlock(-1);
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
              setSelectedBlock(uid);
            }}
            onKeyDown={() => {
              setSelectedBlock(uid);
            }}
            role="button"
            tabIndex="0"
          >
            {panel.productIcon === 'iconless' ? (
              <h3>{panel.title}</h3>
            ) : (
              <div className="home-product-title">{panel.title}</div>
            )}
          </div>
        ))}
      </div>
      <SidebarPortal selected={selected && selectedBlock === -1}>
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
        selected={selected && selectedBlock !== -1 && data.products?.blocks}
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
                  [selectedBlock]: {
                    ...data.products.blocks[selectedBlock],
                    [id]: value,
                  },
                },
              },
            });
          }}
          formData={data.products?.blocks[selectedBlock]}
        />
      </SidebarPortal>
    </>
  );
};
export default compose(withObjectBrowser, injectIntl)(CclHomeProductsBlockEdit);
