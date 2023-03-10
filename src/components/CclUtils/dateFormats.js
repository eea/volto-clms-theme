import { parseDateTime } from '@plone/volto/helpers';
import moment from 'moment';

const getInternalValue = (value, lang) => {
  moment.locale(lang);
  return parseDateTime(lang, value, undefined, moment);
};

export const cclDateTimeFormat = (date) => {
  const dateObj = new Date(date);
  const day = ('0' + dateObj.getDate()).slice(-2);
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();
  const hours = ('0' + dateObj.getHours()).slice(-2);
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);
  return `${day}.${month}.${year} ${hours}.${minutes}`;
};

export const workOpportunitiesCclDateTimeFormat = (date, lang) => {
  const internal = getInternalValue(date, lang);
  return internal?.format('DD.MM.YYYY HH.mm');
};

export const cclDateFormat = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();
  return `${day}.${month}.${year}`;
};

export const workOpportunitiesCclDateFormat = (date, lang) => {
  const internal = getInternalValue(date, lang);
  return internal.format('DD.MM.YYYY');
};

export const cclTimeFormat = (date) => {
  const dateObj = new Date(date);
  const hours = ('0' + dateObj.getHours()).slice(-2);
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);
  return `${hours}.${minutes}`;
};
