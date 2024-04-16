import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'semantic-ui-react';

export const ProjectionNaming = ({ item, cartItems, setCartItems }) => {
  const projections_uid = useSelector(
    (state) => state.downloadtool.projections_in_progress_uid,
  );
  const setProjectionValue = (unique_id, value) => {
    const objIndex = cartItems.findIndex((obj) => obj.unique_id === unique_id);
    cartItems[objIndex].projection = value;
    setCartItems([...cartItems]);
  };
  useEffect(() => {
    setProjectionValue(
      item?.unique_id,
      item?.original_projection?.split('/')[0],
    );
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !item?.file_id ? (
    <Select
      placeholder="Select projection"
      // value={item?.projection}
      defaultValue={item?.original_projection.split('/')[0]}
      options={
        projections_uid?.[item.dataset_uid] &&
        projections_uid[item.dataset_uid].length > 0 &&
        projections_uid[item.dataset_uid]
          ?.sort((a, b) => {
            if (Number(a.split(':')[1]) > Number(b.split(':')[1])) {
              return 1;
            } else {
              return -1;
            }
          })
          ?.map((projection) => {
            const re = new RegExp(projection.split(':')[1]);
            return {
              key: projection,
              value: projection,
              text: re.test(item.original_projection)
                ? `${projection} (Source system of the dataset)`
                : projection,
              className: re.test(item.original_projection)
                ? 'original_projection'
                : 'projection',
            };
          })
      }
      onChange={(e, data) => {
        setProjectionValue(item?.unique_id, data.value);
      }}
    />
  ) : (
    '-'
  );
};
