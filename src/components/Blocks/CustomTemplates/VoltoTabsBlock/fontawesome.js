import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

export const getFontAwesomeIconList = (fa_icons_types) => {
//   const fa_icons_types = [far];
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
