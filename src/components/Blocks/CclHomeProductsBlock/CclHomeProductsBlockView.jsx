import React from 'react';
import UniversalLink from '../../../customizations/volto/components/manage/UniversalLink/UniversalLink';

const CclHomeProductsBlockView = (props) => {
  const { data } = props;
  let products = data?.products?.blocks_layout?.items.map(
    (uid) => data.products.blocks[uid],
  );
  return (
    <div className="home-products-container">
      {products?.map((product, index) => (
        <UniversalLink
          key={index}
          href={product?.linkSelector}
          openLinkInNewTab={false}
          // {
          //   isUrl(product?.linkSelector)
          //     ? flattenToAppURL(product.linkSelector)
          //     : isUrl('http://' + product?.linkSelector)
          //     ? flattenToAppURL('http://' + product.linkSelector)
          //     : flattenToAppURL(window.location + '#')
          // }
          className={
            product.productIcon === 'iconless'
              ? 'home-product home-product-main'
              : 'home-product'
          }
          id={product.productIcon === 'iconless' ? '' : product.productIcon}
        >
          {/* <div
            key={index}
            role="button"
            className={
              product.productIcon === 'iconless'
                ? 'home-product home-product-main'
                : 'home-product'
            }
            tabIndex={0}
            onClick={() => {
              isUrl(product?.linkSelector)
                ? window.location.assign(product.linkSelector)
                : isUrl('http://' + product?.linkSelector)
                ? window.location.assign('http://' + product.linkSelector)
                : window.location.replace(window.location + '#');
            }}
            onKeyDown={() => {
              isUrl(product?.linkSelector)
                ? window.location.assign(product.linkSelector)
                : isUrl('http://' + product?.linkSelector)
                ? window.location.assign('http://' + product.linkSelector)
                : window.location.replace(window.location + '#');
            }}
            id={product.productIcon === 'iconless' ? '' : product.productIcon}
          > */}
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
          {/* </div> */}
        </UniversalLink>
      ))}
    </div>
  );
};

export default CclHomeProductsBlockView;
