import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Select, Loader } from 'semantic-ui-react';
import { baseSources } from '../../../constants/utmProjections';
import { getUtm } from './utils';

export const ProjectionNaming = ({ item, cartItems, setCartItems }) => {
  const [loading, setLoading] = useState(true);
  const projections_uid = useSelector(
    (state) => state.downloadtool.projections_in_progress_uid,
  );
  const setProjectionValue = (unique_id, value, cI) => {
    const new_cartItems = [...cI];
    const objIndex = cI.findIndex((obj) => obj.unique_id === unique_id);
    if (new_cartItems[objIndex]) new_cartItems[objIndex].projection = value;
    setCartItems([...new_cartItems]);
  };
  const utm = getUtm(item);

  let [choices, setChoices] = useState([]);

  useEffect(() => {
    if (
      projections_uid?.[item.dataset_uid] &&
      projections_uid?.[item.dataset_uid].length > 0
    ) {
      setLoading(true);
      setChoices(
        projections_uid?.[item.dataset_uid]
          ?.sort((a, b) => {
            if (Number(a.split(':')[1]) > Number(b.split(':')[1])) {
              return 1;
            } else {
              return -1;
            }
          })
          .filter((p) => utm.includes(p) || baseSources.includes(p))
          .map((p) => {
            const re = new RegExp(p.split(':')[1]);
            return {
              key: p,
              value: p,
              default: re.test(item.original_projection) ? true : false,
              text: re.test(item.original_projection)
                ? `${p} (Source system of the dataset)`
                : p,
              className: re.test(item.original_projection)
                ? 'original_projection'
                : 'projection',
            };
          }),
      );
      setTimeout(() => {
        choices.length > 0 &&
          setProjectionValue(
            item?.unique_id,
            item?.projection
              ? item.projection
              : choices.find((ch) => ch.default)
              ? choices.find((ch) => ch.default).key
              : choices[0].key,
            cartItems,
          );
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }, 200);
    } else {
      setLoading(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(projections_uid?.[item.dataset_uid]), item.unique_id]);

  useEffect(() => {
    !item.projection && choices.length > 0
      ? setProjectionValue(item?.unique_id, choices[0].key, cartItems)
      : !item.projection && choices.length === 0
      ? setLoading(true)
      : setProjectionValue(item?.unique_id, item.projection, cartItems);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !item?.file_id ? (
    loading ? (
      <Loader active inline />
    ) : (
      <Select
        placeholder="Select projection"
        value={item?.projection ?? choices[0].key}
        options={choices}
        onChange={(e, data) => {
          setProjectionValue(item?.unique_id, data.value, cartItems);
        }}
      />
    )
  ) : (
    '-'
  );
};
