import { v4 as uuid } from 'uuid';
export const emptyCard = (count) => {
  const blocks = {};
  const items = [];
  for (let x = 0; x < count; x++) {
    const id = uuid();
    blocks[id] = {};
    blocks[id].title = 'Custom title ' + x;
    blocks[id].description = 'Custom description for the card ' + x;
    blocks[id]['@type'] = 'customCard';
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

export const slugify = (string) => {
  return string
    ? string
        .toLowerCase()
        .replace(/[\s-]+/g, '_')
        .replace(/[^\w]+/g, '')
    : '';
};

export function formatFileSize(bytes, decimalPoint) {
  if (bytes === 0) return '0 Bytes';
  var k = 1000,
    dm = decimalPoint || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
