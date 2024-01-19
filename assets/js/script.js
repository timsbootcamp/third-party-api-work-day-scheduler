const today=dayjs();
const dayWeek = today.format("dddd"); // returns day of week (eg. 'Friday')
const currentMonth = today.format('MMMM'); // eg. January
const currentDay = today.format('D');  // eg. 19 (ie. day of month)

// using Jquery get id of currentDay
var dateEl = $("#currentDay");

// update date using dateEl via Jquery
dateEl.text(dayWeek + ", " + currentMonth + " " + currentDay);



