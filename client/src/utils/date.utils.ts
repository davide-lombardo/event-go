/**
 * Returns the weekday name for a given date string in a specific locale.
 *
 * @param {string} dateStr - The date string in the format 'YYYY-MM-DD'.
 * @param {string|string[]} locale - The locale to use for formatting the weekday name.
 * @returns {string} The weekday name.
 */
export const getWeekDayName = (dateStr: string, locale: string | string[]) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    weekday: 'long',
  });
}

/**
 * Returns an array of dates between a start and end date.
 *
 * @param {string|number} start - The start date in the format 'YYYY-MM-DD' or a timestamp.
 * @param {string|number} end - The end date in the format 'YYYY-MM-DD' or a timestamp.
 * @returns {string[]} An array of dates in the format 'YYYY-MM-DD'.
 */
export const getDatesBetween = (start: string | number, end: string | number): string[] => {
  const dates = [];
  for (let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
    dates.push(new Date(dt).toLocaleDateString());
  }
  return dates;
}


export const stringToDateTime = (date: string, time: string) => {
  const splittedTime = time.split(':').map(s => parseInt(s));
  const h = splittedTime.shift() as number;
  const m = splittedTime.shift() as number;
  try {
    return new Date(date).setHours(h, m);
  } catch (error) {
    throw error;
  }
}

/**
 * Checks if a value is a valid date.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a valid date, false otherwise.
 */
export const isValidDate = (value: any) => !isNaN(Date.parse(value));

/**
 * Formats a date string in the format 'YYYY-MM-DD'.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats a date string in a custom format.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 */
export const formatDateCustom = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}