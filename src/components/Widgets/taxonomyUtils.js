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
  if (choices.length > 0) {
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
    });
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
      if (splitted_option.length > 1) {
        var parent_option = splitted_option.slice(0, -1).pop();
        options.forEach((opt) => {
          if (opt.label === parent_option) {
            opt.childrens.push(modified_option);
          }
        });
      }
    });
  }

  // options = options.map((item) => {
  //   item['children'] = sort_array_items_by_key(item['childrens'], 'label');
  //   return item;
  // });

  // return sort_array_items_by_key(options, 'label');
  //return options.reverse();

  if (options.length > 0) {
    options = options
      .sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        } else if (a.label > b.label) {
          return 1;
        }
        return 0;
      })
      .map((option) => {
        return { ...option, label: option.label.replace(/^[0-9][0-9]#/, '') };
      });
  }

  return options;
};
