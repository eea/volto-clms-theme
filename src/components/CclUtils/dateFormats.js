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
  //const day = dateObj.getDate();
  const day = ('0' + dateObj.getDate()).slice(-2);
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const year = dateObj.getFullYear();
  return `${day}.${month}.${year}`;
};

export const cclCartDateFormat = (date) => {
  const dateObj = new Date(date);
  // Use UTC methods to ensure consistent display regardless of user timezone
  const day = ('0' + dateObj.getUTCDate()).slice(-2);
  const month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2);
  const year = dateObj.getUTCFullYear();
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

/**
 * Convert a Date object to UTC timestamp, preserving the calendar date
 * regardless of the user's timezone.
 *
 * @param {Date} date - The date to convert
 * @param {boolean} isEndOfDay - If true, set time to 23:59:59.999, otherwise 00:00:00.000
 * @returns {number|null} UTC timestamp in milliseconds, or null if date is falsy
 */
export const toUTCTimestamp = (date, isEndOfDay = false) => {
  if (!date) return null;

  // Adjust for timezone offset to get the intended UTC date
  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  );

  if (isEndOfDay) {
    offsetDate.setUTCHours(23, 59, 59, 999);
  }

  return offsetDate.getTime();
};
