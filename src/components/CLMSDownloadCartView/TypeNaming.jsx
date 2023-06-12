import { Select } from 'semantic-ui-react';

import { getCollectionByItem, contentOrDash } from './cartUtils';

export const TypeNaming = ({
  item,
  datasets_items,
  cartItems,
  setCartItems,
}) => {
  const types_options =
    item?.type_options?.length > 0
      ? [...new Set(item.type_options.map((ddi) => ddi.name))]
      : [];
  if (item.file_id) {
    return (
      <span className={'tag tag-' + item?.type?.toLowerCase()}>
        {contentOrDash(item.type)}
      </span>
    );
  } else if (!item.type) {
    return '-';
  } else {
    let defaultType = getCollectionByItem(item);
    return types_options.length > 1 ? (
      <Select
        placeholder="Select type"
        value={defaultType.name}
        options={
          types_options.length > 0
            ? types_options.map((option) => {
                return {
                  key: option,
                  value: option,
                  text: option,
                };
              })
            : []
        }
        onChange={(e, data) => {
          const new_cartItems = [...cartItems];
          const objIndex = new_cartItems.findIndex(
            (obj) => obj.unique_id === item.unique_id,
          );
          const first_type_id = item.type_options.filter(
            (t_o) => t_o.name === data.value,
          )[0].id;
          new_cartItems[objIndex].type = first_type_id;
          const dataset = datasets_items
            ? datasets_items.find((req) => req.UID === item.dataset_uid)
            : false;
          const format_item = dataset.dataset_download_information.items.find(
            (item) => item['@id'] === first_type_id,
          );
          new_cartItems[objIndex].format = format_item.full_format;
          setCartItems([...new_cartItems]);
        }}
      />
    ) : (
      defaultType.name
    );
  }
};
