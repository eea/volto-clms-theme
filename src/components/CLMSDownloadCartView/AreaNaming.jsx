export const AreaNaming = (areaProps) => {
  const { item } = areaProps;
  switch (item.area?.type) {
    case 'polygon':
      return (
        <>
          <span>Bounding Box</span>
          <br />
          <span className="cart-bounding-boxes">
            <span className="cart-bounding-box-row">
              <span>{`N: ${item.area.value[1].toFixed(1)}º `}</span>&nbsp;
              <span>{`E: ${item.area.value[2].toFixed(1)}º `}</span>
            </span>
            <span className="cart-bounding-box-row">
              <span>{`S: ${item.area.value[3].toFixed(1)}º `}</span>&nbsp;
              <span>{`W: ${item.area.value[0].toFixed(1)}º `}</span>
            </span>
          </span>
        </>
      );
    case 'nuts':
      return 'NUTS: ' + (item.area.valueName || item.area.value);
    case undefined:
      return item.area || item.file || '-';
    case typeof item.area === 'string':
      return item.area || item.file || '-';
    default:
      return '-';
  }
};
