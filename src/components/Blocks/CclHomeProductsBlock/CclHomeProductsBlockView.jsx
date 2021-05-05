import React from 'react';

const CclHomeProductsBlockView = (props) => {
  const { data } = props;
  let products = data.products.blocks_layout.items.map(
    (uid) => data.products.blocks[uid],
  );
  return (
    <div className="home-products-container">
      {products?.map((panel, index) => (
        <div
          key={index}
          className={
            panel.productIcon === 'iconless'
              ? 'home-product home-product-main'
              : 'home-product'
          }
          id={panel.productIcon === 'iconless' ? '' : panel.productIcon}
        >
          {panel.productIcon === 'iconless' ? (
            <h3>{panel.title}</h3>
          ) : (
            <div className="home-product-title">{panel.title}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CclHomeProductsBlockView;
