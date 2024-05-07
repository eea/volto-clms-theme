import { Select } from 'semantic-ui-react';

import { getCollectionByItem } from '../cartUtils';

export const CollectionNaming = ({
  item,
  datasets_items,
  cartItems,
  setCartItems,
}) => {
  if (item?.file_id) {
    return '-';
  } else if (!item?.type) {
    return '-';
  }
  const type_name = item?.type_options.find((t_o) => t_o.id === item?.type)
    ?.name;

  const this_type_collections = item?.type_options.filter(
    (o) => o.name === type_name,
  );
  return this_type_collections.length > 1 ? (
    <Select
      placeholder="Select type"
      className="collection-selector"
      value={
        item?.type
          ? item?.type
          : item?.type_options.length > 0 && item?.type_options[0].id
      }
      options={
        item?.type_options?.length > 0 &&
        this_type_collections.map((option) => {
          return {
            key: option.id,
            value: option.id,
            text: option.collection ?? '-',
          };
        })
      }
      onChange={(e, data) => {
        const new_cartItems = [...cartItems];
        const objIndex = new_cartItems.findIndex(
          (obj) => obj.unique_id === item?.unique_id,
        );
        new_cartItems[objIndex].type = data.value;
        const dataset = datasets_items
          ? datasets_items.find((req) => req.UID === item?.dataset_uid)
          : false;
        const format_item = dataset.dataset_download_information.items.find(
          (item) => item['@id'] === data.value,
        );
        new_cartItems[objIndex].format = format_item?.full_format;
        setCartItems([...new_cartItems]);
      }}
    />
  ) : (
    getCollectionByItem(item).collection ?? '-'
  );
};
