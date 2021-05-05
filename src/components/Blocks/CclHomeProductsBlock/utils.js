import { v4 as uuid } from 'uuid';
export const emptyProduct = (count) => {
  const blocks = {};
  const items = [];
  for (let x = 0; x < count; x++) {
    const id = uuid();
    blocks[id] = {};
    blocks[id].title = 'Product title ' + x;
    if (x > 0) {
      blocks[id].productIcon = 'home_product_' + x;
    } else {
      blocks[id].productIcon = 'iconless';
    }
    blocks[id].linkSelector = [];
    blocks[id]['@type'] = 'product';
    items.push(id);
  }

  return {
    blocks,
    blocks_layout: {
      items,
    },
  };
};

export const getPanels = (data) => {
  return (data?.blocks_layout?.items || []).map((id) => [
    id,
    data.blocks?.[id],
  ]);
};
