export const checkAllChildren = (value, option) => {
  if (!option?.childrens || option.childrens.length === 0) {
    return [...value, { label: option.label, value: option.value }];
  }
  option.childrens.forEach((ch) => {
    if (value.filter((v) => v.value === ch.value).length === 0) {
      value.push(ch);
    }
  });
  value.push({ label: option.label, value: option.value });
  return value;
};
