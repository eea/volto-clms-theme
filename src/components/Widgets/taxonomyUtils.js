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
  return options;
};
