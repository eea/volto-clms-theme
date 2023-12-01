import { Label } from 'semantic-ui-react';
export const AreaNaming = (areaProps) => {
  const { item } = areaProps;
  switch (item?.area?.type) {
    case 'polygon':
      return (
        <>
          <span>Bounding Box</span>
          <br />
          <span className="cart-bounding-boxes">
            <span className="cart-bounding-box-row">
              <Label>{`N: ${item?.area.value[1].toFixed(1)}º`}</Label>&nbsp;
              <Label>{`E: ${item?.area.value[2].toFixed(1)}º`}</Label>&nbsp;
              {/* </span>
            <span className="cart-bounding-box-row"> */}
              <Label>{`S: ${item?.area.value[3].toFixed(1)}º`}</Label>&nbsp;
              <Label>{`W: ${item?.area.value[0].toFixed(1)}º`}</Label>
            </span>
          </span>
        </>
      );
    case 'nuts':
      return item?.area.valueName || item?.area.value;
    case undefined:
      return item?.area || item?.file || '-';
    case typeof item?.area === 'string':
      return item?.area || item?.file || '-';
    default:
      return '-';
  }
};
