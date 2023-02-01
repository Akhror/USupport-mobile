const ONE_HOUR = 60 * 60 * 1000;
const FIVE_MINUTES = 5 * 60 * 1000;

/**
 * Get the day of the week from a Date object
 * @param {Date} date
 * @returns {String}
 */
function getDayOfTheWeek(date) {
  const newDate = new Date(date);
  const day = newDate.getDay();
  switch (day) {
    case 0:
      return "sunday";
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
    default:
      return "Unknown";
  }
}

/**
 * Get the date in the format dd.mm.yy
 * @param {Date} date
 * @returns {String}
 */
function getDateView(date) {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const fullYear = newDate.getFullYear();
  const year = fullYear.toString().slice(-2);

  return `${day < 10 ? `0${day}` : day}.${
    month < 10 ? `0${month}` : month
  }.${year}`;
}

/**
 * Get time from Date object
 * @param {Date} date
 * @returns {String} in hh:mm format
 */
const getTimeFromDate = (date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Function to check if a given timestamp is in 5 minutes or less than the current time
 * and if the current time is earlier than an hour after the timestamp
 *
 * @param {number} - the timestamp in milliseconds
 *
 * @returns {boolean}
 */
function checkIsFiveMinutesBefore(timestamp) {
  const currentTime = new Date().getTime();
  const endTime = timestamp + ONE_HOUR;

  return currentTime >= timestamp - FIVE_MINUTES && currentTime <= endTime;
}

/**
 * Get the month name as String from a Date object
 * @param {Date} date
 * @returns {String}
 */
function getMonthName(date) {
  const month = date.getMonth();
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "Unknown";
  }
}

export {
  getDayOfTheWeek,
  getDateView,
  getTimeFromDate,
  checkIsFiveMinutesBefore,
  getMonthName,
  ONE_HOUR,
  FIVE_MINUTES,
};
