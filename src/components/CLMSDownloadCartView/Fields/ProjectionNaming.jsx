import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'semantic-ui-react';
import { baseSources, utm, nutsBB } from '../../../constants/utmProjections';

export const ProjectionNaming = ({ item, cartItems, setCartItems }) => {
  const projections_uid = useSelector(
    (state) => state.downloadtool.projections_in_progress_uid,
  );
  const setProjectionValue = (unique_id, value) => {
    const objIndex = cartItems.findIndex((obj) => obj.unique_id === unique_id);
    cartItems[objIndex].projection = value;
    setCartItems([...cartItems]);
  };
  let availableProjections = projections_uid?.[item.dataset_uid]?.sort(
    (a, b) => {
      if (Number(a.split(':')[1]) > Number(b.split(':')[1])) {
        return 1;
      } else {
        return -1;
      }
    },
  );
  let defaultValue = availableProjections[0];
  let filtered = [];
  filtered = utm
    .filter((d) => {
      return item.area.type === 'polygon'
        ? d.bb[0] < item.area.value[0] &&
            d.bb[1] < item.area.value[1] &&
            d.bb[2] > item.area.value[2] &&
            d.bb[3] > item.area.value[3]
        : d.bb[0] < nutsBB[item.area.value][0] &&
            d.bb[1] < nutsBB[item.area.value][1] &&
            d.bb[2] > nutsBB[item.area.value][2] &&
            d.bb[3] > nutsBB[item.area.value][3];
    })
    .map((u) => u.source);

  if (filtered.length > 0) {
    defaultValue = item.original_projection
      .replace('EPSG:', '')
      .split('/')
      .map((op) => op.trim())
      .includes(filtered[0].replace('EPSG:', ''))
      ? filtered[0]
      : availableProjections[0];
  }
  availableProjections = availableProjections.filter(
    (p) => filtered.includes(p) || baseSources.includes(p),
  );

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
      defaultValue={defaultValue}
      options={availableProjections?.map((projection) => {
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
      })}
      onChange={(e, data) => {
        setProjectionValue(item?.unique_id, data.value);
      }}
    />
  ) : (
    '-'
  );
};
