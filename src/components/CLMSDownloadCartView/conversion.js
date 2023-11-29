const DATASET_FORMATS_NAMES = {
  Shapefile: 'Shapefile (SHP)',
  GDB: 'File Geodatabase (FGDB)',
  GPKG: 'GeoPackage (GPKG)',
  Geojson: 'GeoJSON',
  Geotiff: 'GeoTIFF',
  Netcdf: 'Network Common Data Form (NetCDF)',
  GML: 'Geography Markup Language (GML)',
  WFS: 'WFS',
};

export const getAvailableConversion = (conversionTable, defaultValue) => {
  if (conversionTable && Object.keys(conversionTable).length > 0) {
    if (
      conversionTable[defaultValue] === undefined ||
      conversionTable[defaultValue] === null
    ) {
      defaultValue = Object.keys(conversionTable)[0];
    }
    const keys = Object.keys(conversionTable[defaultValue]);
    return keys
      .filter((key) => {
        return conversionTable[defaultValue][key];
      })
      .map((item) => {
        const text = DATASET_FORMATS_NAMES[item]
          ? DATASET_FORMATS_NAMES[item]
          : item;
        return {
          key: item,
          value: item,
          text: text,
        };
      });
  } else {
    return [];
  }
};

export const initializeIfNotCompatibleConversion = (
  conversionTable,
  defaultValue,
) => {
  if (
    conversionTable[defaultValue] === undefined ||
    conversionTable[defaultValue] === null
  ) {
    defaultValue = Object.keys(conversionTable)[0];
  }
  return defaultValue;
};
