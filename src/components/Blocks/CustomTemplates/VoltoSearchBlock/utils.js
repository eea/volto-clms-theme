export const checkAllChildren = (value, option) => {
  if (!option?.childrens || option.childrens.length === 0) {
    return [...value, { label: option.label, value: option.value }];
  }
  option.childrens.forEach((ch) => {
    if (value.filter((v) => v.value === ch.value).length === 0) {
      value.push(ch);
    }
  });
  return [...value, { label: option.label, value: option.value }];
};

export const uncheckOptionAndChildren = (value, option) => {
  return value
    .filter((item) => item.value !== option.value)
    .filter((item) => {
      if (option.childrens?.length > 0) {
        return !option.childrens.map((ch) => ch.value).includes(item.value);
      } else {
        return true;
      }
    });
};
