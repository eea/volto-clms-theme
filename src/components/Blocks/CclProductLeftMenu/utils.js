import { v4 as uuid } from 'uuid';
export const emptyButton = (count) => {
  const blocks = {};
  const items = [];
  for (let x = 0; x < count; x++) {
    const id = uuid();
    blocks[id] = {};
    blocks[id]['@type'] = 'CclButton';
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
