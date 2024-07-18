import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Select, Loader, Popup } from 'semantic-ui-react';
// import { baseSources } from '../../../constants/utmProjections';
import { getUtm } from './utils';
import { FontAwesomeIcon } from '@eeacms/volto-clms-utils/components';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable';

const _ProjectionNaming = ({
  item,
  cartItems,
  setCartItems,
  utmProjections,
}) => {
  const { baseSources } = utmProjections;
  const [loading, setLoading] = useState(true);
  const projections_uid = useSelector(
    (state) => state.downloadtool.projections_in_progress_uid,
  );
  const setProjectionValue = (unique_id, value, cI) => {
    const new_cartItems = [...cI];
    const objIndex = cI.findIndex((obj) => obj.unique_id === unique_id);
    if (new_cartItems[objIndex]) {
      new_cartItems[objIndex].projection = value;
    }
    setCartItems([...new_cartItems]);
  };
  const utm = getUtm(item, utmProjections);

  let [choices, setChoices] = useState([]);

  useEffect(() => {
    choices.length > 0 &&
      setProjectionValue(
        item?.unique_id,
        item?.projection
          ? item.projection
          : choices.find((ch) => ch.default)
          ? choices.find((ch) => ch.default).key
          : choices[0]?.key,
        cartItems,
      );
    setTimeout(() => {
      setLoading(false);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices]);

  const datasetProjections = JSON.stringify(
    projections_uid?.[item.dataset_uid],
  );

  useEffect(() => {
    if (datasetProjections && datasetProjections.length > 0) {
      setLoading(true);
      const newBaseSources = ['EPSG:4326'];
      const sortedProjections = projections_uid[item.dataset_uid].sort((a, b) =>
        Number(a.split(':')[1]) > Number(b.split(':')[1]) ? 1 : -1,
      );

      const filteredProjections =
        item?.format === 'Netcdf' ||
        item?.format?.token === 'Netcdf' ||
        item?.format?.title === 'Netcdf'
          ? sortedProjections.filter(
              (p) => utm.includes(p) || newBaseSources.includes(p),
            )
          : sortedProjections.filter(
              (p) => utm.includes(p) || baseSources.includes(p),
            );

      const choices = filteredProjections.map((p) => {
        const re = new RegExp(p.split(':')[1]);
        return {
          key: p,
          value: p,
          default: re.test(item.original_projection),
          text: re.test(item.original_projection)
            ? `${p} (Source system of the dataset)`
            : p,
          className: re.test(item.original_projection)
            ? 'original_projection'
            : 'projection',
        };
      });

      setChoices(choices);
      setLoading(false);
    } else {
      setLoading(true);
    }
    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasetProjections, item.unique_id, item.format]);

  useEffect(() => {
    !item.projection && choices.length > 0 && choices.find((ch) => ch.default)
      ? setProjectionValue(
          item?.unique_id,
          choices.find((ch) => ch.default).key,
          cartItems,
        )
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
      <>
        <Select
          placeholder="Select projection"
          value={
            item?.projection ??
            choices.find((ch) => ch.default)?.key ??
            choices[0]?.key
          }
          options={choices}
          onChange={(e, data) => {
            setProjectionValue(item?.unique_id, data.value, cartItems);
          }}
          style={{ marginRight: '15%' }}
        />
        {!choices.find((ch) => ch.default) && choices.length === 4 && (
          <Popup
            content="You have selected an area that covers more that one EPSG code. For this we only offer to reproject the data to a EPSG code that includes the whole area selected by you"
            trigger={
              <FontAwesomeIcon
                color="#000000"
                icon={['fas', 'exclamation-circle']}
              />
            }
          />
        )}
      </>
    )
  ) : (
    '-'
  );
};
export const ProjectionNaming = injectLazyLibs(['utmProjections'])(
  _ProjectionNaming,
);
