
// using Jquery get id of currentDay
var dateEl = $("#currentDay");



// get date in format like 'Sunday, January 21'
function getDateForTopOfWebPage() {

  const dayjslib =dayjs();
  const dayWeek = dayjslib.format("dddd"); // returns day of week (eg. 'Friday')
  const currentMonth = dayjslib.format('MMMM'); // eg. January
  const currentDay = dayjslib.format('D');  // eg. 19 (ie. day of month)
 
  return dayWeek + ", " + currentMonth + " " + currentDay
}


// using Day.js get todays date in format dd/mm/yyyy - this format gets saved to local storage
function getTodaysDate_ddmmyyyy() {
  return dayjs().format("DD/MM/YYYY");
}

// using Day.js get current hour
function getCurrentHour() {
  return dayjs().format('HH');
}



