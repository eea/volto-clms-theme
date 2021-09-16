import React from 'react';

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
          className={
            product.productIcon === 'iconless'
              ? 'home-product home-product-main'
              : 'home-product'
          }
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
