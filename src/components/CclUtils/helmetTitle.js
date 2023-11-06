export const helmetTitle = (title_tag_content, content) => {
  let nav_root_title = content?.['@components']?.navroot?.navroot?.title;
  const result_title =
    nav_root_title === title_tag_content
      ? title_tag_content ?? ''
      : title_tag_content + ' — ' + nav_root_title;
  return result_title.replace(/\u00AD/g, '');
};
