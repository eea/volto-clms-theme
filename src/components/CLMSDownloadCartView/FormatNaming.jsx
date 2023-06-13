import { Select } from 'semantic-ui-react';

import { formatNaming, originalFormatNaming } from './cartUtils';
import { getAvailableConversion } from './conversion';

export const FormatNaming = ({
  item,
  cartItems,
  setCartItems,
  formatConversionTable,
}) => {
  const format_options = getAvailableConversion(
    formatConversionTable,
    originalFormatNaming(item),
  );
  const item_format_name = formatNaming(item);
  return !item.file_id ? (
    format_options.length > 1 ? (
      <Select
        placeholder="Select format"
        value={item_format_name}
        options={format_options}
        onChange={(e, data) => {
          const objIndex = cartItems.findIndex(
            (obj) => obj.unique_id === item.unique_id,
          );
          cartItems[objIndex].format = data.value;
          setCartItems([...cartItems]);
        }}
      />
    ) : (
      item_format_name
    )
  ) : (
    item_format_name
  );
};
