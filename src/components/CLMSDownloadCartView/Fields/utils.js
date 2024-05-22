import { baseSources, utm, nutsBB } from '../../../constants/utmProjections';
export const getUtm = (item) => {
  return utm
    .filter((d) => {
      if (!item?.area?.value) {
        return false;
      }
      return item.area.type === 'polygon'
        ? d.bb[0] < item.area.value[0] &&
            d.bb[1] < item.area.value[1] &&
            d.bb[2] > item.area.value[2] &&
            d.bb[3] > item.area.value[3]
        : nutsBB[item.area.value] !== undefined
        ? d.bb[0] < nutsBB[item.area.value][0] &&
          d.bb[1] < nutsBB[item.area.value][1] &&
          d.bb[2] > nutsBB[item.area.value][2] &&
          d.bb[3] > nutsBB[item.area.value][3]
        : false;
    })
    .map((u) => u.source);
};

export const getChoices = (projections, item) => {
  return projections
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
        text: re.test(item.original_projection)
          ? `${p} (Source system of the dataset)`
          : p,
        className: re.test(item.original_projection)
          ? 'original_projection'
          : 'projection',
      };
    });
};
