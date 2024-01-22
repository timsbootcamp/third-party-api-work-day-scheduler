
// using Jquery get id of currentDay
var dateEl = $("#currentDay");



// get date in format like 'Sunday, January 21'
function getDateForTopOfWebPage() {

  const dayjslib =dayjs();
  const dayWeek = dayjslib.format("dddd"); // returns day of week (eg. 'Friday')
  const currentMonth = dayjslib.format('MMMM'); // eg. January
  const currentDay = dayjslib.format('D');  // eg. 19 (ie. day of month)
 
  return dayWeek + ", " + currentMonth + " " + currentDay + addDaySuffix(currentDay)
}


// using Day.js get todays date in format dd/mm/yyyy - this format gets saved to local storage
function getTodaysDate_ddmmyyyy() {
  return dayjs().format("DD/MM/YYYY");
}

// using Day.js get current hour
function getCurrentHour() {
  return dayjs().format('HH');
}

// Takes a parameter variable, 'day' and returns with the suffix ("st", "nd", "rd", or "th")
function addDaySuffix(day) {

  // Convert parameter variable, 'day' to a string
  const dayString = day.toString();

  // Extract last character and convert it back to a number
  const lastDigit = Number(dayString.charAt(dayString.length - 1));

  // Handle 11th, 12th, and 13th
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  else {
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}

