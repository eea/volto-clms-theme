export const isEmpty = (strToSanitize) => {
  const parser = new DOMParser();
  let myHTML = parser.parseFromString(strToSanitize, 'text/html');
  // let test = strToSanitize.replace(/(<([^>]+)>)/gi, '');
  // console.log('myHTML', myHTML);
  // console.log('test', test);
  return myHTML.body.textContent || '';
};
