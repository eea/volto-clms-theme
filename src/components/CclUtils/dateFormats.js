import { parseDateTime } from '@plone/volto/helpers';
import moment from 'moment';
import { useSelector } from 'react-redux';

const getInternalValue = (value) => {
  const lang = useSelector((state) => state.intl.locale);
  moment.locale(lang);
  return parseDateTime(lang, value, undefined, moment);
};

export const oldCclDateTimeFormat = (date) => {
  const dateObj = new Date(date);
  const day = ('0' + dateObj.getDate()).slice(-2);
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();
  const hours = ('0' + dateObj.getHours()).slice(-2);
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);
  return `${day}.${month}.${year} ${hours}.${minutes}`;
};

export const cclDateTimeFormat = (date) => {
  const internal = getInternalValue(date);
  return internal.format('DD.MM.YYYY hh.mm A');
};

export const oldCclDateFormat = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();
  return `${day}.${month}.${year}`;
};

export const cclDateFormat = (date) => {
  const internal = getInternalValue(date);
  return internal.format('DD.MM.YYYY');
};
