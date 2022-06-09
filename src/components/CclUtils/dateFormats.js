export const cclDateTimeFormat = (date) => {
  const dateObj = new Date(date);
  const day = ('0' + dateObj.getDate()).slice(-2);
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();
  const hours = ('0' + dateObj.getHours()).slice(-2);
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);
  return `${day}.${month}.${year} ${hours}.${minutes}`;
};

export const cclDateFormat = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();
  return `${day}.${month}.${year}`;
};