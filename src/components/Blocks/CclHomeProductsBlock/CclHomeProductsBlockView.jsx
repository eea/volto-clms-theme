import React from 'react';
import { isUrl } from '@plone/volto/helpers';

const CclHomeProductsBlockView = (props) => {
  const { data } = props;
  let products = data?.products?.blocks_layout?.items.map(
    (uid) => data.products.blocks[uid],
  );
  return (
    <div className="home-products-container">
      {products?.map((product, index) => (
        <div
          key={index}
          role="button"
          className={
            product.productIcon === 'iconless'
              ? 'home-product home-product-main'
              : 'home-product'
          }
          tabIndex={0}
          onClick={() => {
            window.location.href = isUrl(product?.linkSelector)
              ? product.linkSelector
              : isUrl('http://' + product?.linkSelector)
              ? 'http://' + product.linkSelector
              : '#';
          }}
          onKeyDown={() => {
            window.location.href = isUrl(product?.linkSelector)
              ? product.linkSelector
              : isUrl('http://' + product?.linkSelector)
              ? 'http://' + product.linkSelector
              : '#';
          }}
          id={product.productIcon === 'iconless' ? '' : product.productIcon}
        >
          {product.productIcon === 'iconless' ? (
            <h3>{product.title}</h3>
          ) : (
            <>
              <div className="home-product-title">{product.title}</div>
              <div className="home-product-description">
                {product.description}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CclHomeProductsBlockView;
