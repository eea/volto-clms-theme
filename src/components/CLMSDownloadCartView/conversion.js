export const getAvailableConversion = (conversionTable, defaultValue) => {
  if (conversionTable[defaultValue] === undefined) {
    defaultValue = Object.keys(conversionTable)[0];
  }

  const keys = Object.keys(conversionTable[defaultValue]);

  const filtered_values = keys
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
  return filtered_values;
};

export const initializeIfNotCompatibleConversion = (
  conversionTable,
  defaultValue,
) => {
  if (conversionTable[defaultValue] === undefined) {
    defaultValue = Object.keys(conversionTable)[0];
  }
  return defaultValue;
};
