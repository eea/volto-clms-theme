// const sort_array_items_by_key = (items, key) =>
//   items
//     ? items.sort((a, b) => {
//         if (a[key].startsWith('and similar')) {
//           return 999;
//         } else if (b[key].startsWith('and similar')) {
//           return -999;
//         } else if (a[key].toLowerCase() < b[key].toLowerCase()) {
//           return -1;
//         } else if (a[key].toLowerCase() > b[key].toLowerCase()) {
//           return 1;
//         } else {
//           return 0;
//         }
//       })
//     : [];

export const structure_taxonomy_terms = (choices) => {
  let options = [];
  choices.forEach((choice) => {
    var splitted_option = choice.label.split(' » ');
    var modified_option = {
      value: choice.value,
      label:
        splitted_option.length > 1
          ? splitted_option.slice(-1).pop()
          : choice.label,
      original: choice.label,
      childrens: [],
    };
    splitted_option.length === 1 && options.push(modified_option);
    if (splitted_option.length > 1) {
      var parent_option = splitted_option.slice(0, -1).pop();
      options.map((opt) => {
        if (opt.label === parent_option) {
          opt.childrens.push(modified_option);
        }
        return '';
      });
    }
  });

  // options = options.map((item) => {
  //   item['children'] = sort_array_items_by_key(item['childrens'], 'label');
  //   return item;
  // });

  // return sort_array_items_by_key(options, 'label');
  return options.reverse();
};
