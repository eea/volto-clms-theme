import { Select } from 'semantic-ui-react';
export const LayerNaming = ({ item, cartItems, setCartItems }) => {
  if (item.file_id) {
    return '-';
  } else if (!item.type) {
    return '-';
  }

  const this_type_layers = item?.type_options.filter(
    (o) =>
      o.collection ===
      item?.type_options.find((t_o) => t_o.id === item.type).collection,
  );

  return this_type_layers.length > 0 &&
    this_type_layers[0].layers.length > 0 ? (
    <Select
      placeholder="Select layer"
      className="layer-selector"
      value={
        item.layer
          ? item.layer
          : this_type_layers[0].layers.length > 0 &&
            this_type_layers[0].layers[0]
      }
      options={
        this_type_layers[0]?.layers.length > 0 &&
        this_type_layers[0].layers.map((option) => {
          return {
            key: option,
            value: option,
            text: option,
          };
        })
      }
      onChange={(e, data) => {
        const new_cartItems = [...cartItems];
        const objIndex = new_cartItems.findIndex(
          (obj) => obj.unique_id === item.unique_id,
        );
        new_cartItems[objIndex].layer = data.value;
        setCartItems([...new_cartItems]);
      }}
    />
  ) : (
    '-'
  );
};
