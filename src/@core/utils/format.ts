import {PaymentTypes} from './types'

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param date
 */

// ** Checks if the passed date is today
const isToday = (date: Date | string) => {
  const today = new Date()

  return (
    new Date(date).getDate() === today.getDate() &&
    new Date(date).getMonth() === today.getMonth() &&
    new Date(date).getFullYear() === today.getFullYear()
  )
}

export const formatDate = (
  value: Date | string,
  formatting: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
) => {
  if (!value) return value

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value: Date | string, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ? The following functions are taken from https://codesandbox.io/s/ovvwzkzry9?file=/utils.js for formatting credit card details
// Get only numbers from the input value
const clearNumber = (value = '') => {
  return value.replace(/\D+/g, '')
}

// Format credit cards according to their types
export const formatCreditCardNumber = (value: string, Payment: PaymentTypes) => {
  if (!value) {
    return value
  }

  const issuer = Payment.fns.cardType(value)
  const clearValue = clearNumber(value)
  let nextValue

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`
      break
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`
      break
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
        12,
        19
      )}`
      break
  }

  return nextValue.trim()
}

// Format expiration date in any credit card
export const formatExpirationDate = (value: string) => {
  return value
      .replace(/^([1-9]\/|[2-9])$/g, '0$1/') // 3 > 03/
      .replace(/^(0[1-9]|1[0-2])$/g, '$1/') // 11 > 11/
      .replace(/^([0-1])([3-9])$/g, '0$1/$2') // 13 > 01/3
      .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2') // 141 > 01/41
      .replace(/^([0]+)\/|[0]+$/g, '0') // 0/ > 0 and 00 > 0
      // To allow only digits and `/`
      .replace(/[^\d\/]|^[\/]*$/g, '')
      .replace(/\/\//g, '/')
}

// Format CVC in any credit card
export const formatCVC = (value: string, cardNumber: string, Payment: PaymentTypes) => {
  const clearValue = clearNumber(value)
  const issuer = Payment.fns.cardType(cardNumber)
  const maxLength = issuer === 'amex' ? 4 : 3

  return clearValue.slice(0, maxLength)
}
const createDateFormatter = (options: Intl.DateTimeFormatOptions | undefined) => {
  // Create an instance of Intl.DateTimeFormat with the specified options.
  const formatter = new Intl.DateTimeFormat('en-US', options);

  // Return a function that formats a given date (value) using the formatter.
  return (value: string | number | Date) => {
    if (!value) return value;

    // Convert value to a Date object if it is a string.
    const date = typeof value === 'string' ? new Date(value) : value;

    // Use the formatter to format the date and return the formatted date.
    return formatter.format(date);
  };
};
/* Create a date formatter for day-month-year format.*/
export const formatDayMonthYear = createDateFormatter({ day: '2-digit', month: '2-digit', year: '2-digit' });

// Create a date formatter for a full date and time format.
export const formatFullDateTime = createDateFormatter({
  dateStyle: 'full',
  timeStyle: 'long',
});

export const formatJobType = (jobtype: string, replaceValue = '-') => {
  return jobtype?.replaceAll('_', replaceValue);
}

/*Extract File Extension*/
export const extractFileExtension = (toolResponse: string) => {
  const startMarker = "----------FILE_EXTENSION_START----------";
  const endMarker = "----------FILE_EXTENSION_END----------";
  const startIndex = toolResponse.indexOf(startMarker) + startMarker.length;
  const endIndex = toolResponse.indexOf(endMarker);
  return toolResponse.substring(startIndex, endIndex).trim();
}
export const formatYear = createDateFormatter({ year: 'numeric' });

export const getAbbreviation = (name: string) => {
  const words = name.split(' ');
  if (words.length >= 3) {
    return words.map(word => word[0]).join('');
  } else if (words.length === 2) {
    return words.map(word => word[0]).join('');
  }
  return name;
};

// Formatter for human-readable date and times
export const formatHumanReadableDateTime = createDateFormatter({
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});
