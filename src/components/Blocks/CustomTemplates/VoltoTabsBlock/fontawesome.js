import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

/**
 * Return fontAwesome icon list
 * @example
 * import { far } from '@fortawesome/free-regular-svg-icons';
 * let fa_icon_list = getFontAwesomeIconList([far]);
 * @returns [{prefix:far, iconName:"newspaper"},...]
 */
export const getFontAwesomeIconList = (fa_icons_types) => {
  const fa_list = [];
  fa_icons_types.forEach((icons_type) => {
    const fa_keys = Object.keys(icons_type);
    fa_keys.forEach((key) => {
      fa_list.push({
        prefix: icons_type[key].prefix,
        iconName: icons_type[key].iconName,
      });
    });
  });
  return fa_list;
};
