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
        return {
          key: item,
          value: item,
          text: item,
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
