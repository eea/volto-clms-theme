import { v4 as uuid } from 'uuid';
import { map } from 'lodash';
export const emptyCard = (count) => {
  const blocks = {};
  const items = [];
  for (let x = 0; x < count; x++) {
    const id = uuid();
    blocks[id] = {};
    blocks[id].title='Custom title ' + x;
    blocks[id].description='Custom description for the card ' + x;
    blocks[id].['@type']='customCard';
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
