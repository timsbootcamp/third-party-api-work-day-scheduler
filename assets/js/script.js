// Key for local storage
const localStorage_WorkDaySched = "work-day-scheduler";


// Array of business hours
const businessHours = [
  { "id": "9AM", "24hrTime": 9 },
  { "id": "10AM", "24hrTime": 10 },
  { "id": "11AM", "24hrTime": 11 },
  { "id": "12PM", "24hrTime": 12 },
  { "id": "1PM", "24hrTime": 13 },
  { "id": "2PM", "24hrTime": 14 },
  { "id": "3PM", "24hrTime": 15 },
  { "id": "4PM", "24hrTime": 16 },
  { "id": "5PM", "24hrTime": 17 },
]


// Array of calendarData
let calendarData = [];
let timer_for_icon_save;
let refer


// Using this variable to initialise current hour and then we use timer
// to check this variable if hour has changed then we call 'displayTimeBlockColours()' 
let savedHour = "";

// Today's date will be stored in this variable in format of dd/mm/yyyy
let todaysDate_ddmmyyyy = "";


// Only run once, when the page Document Object Model (DOM) is ready for JavaScript code to execute
$(document).ready(function () {

  // Using Day.js get todays date in format dd/mm/yyyy - this format gets saved to local storage
  todaysDate_ddmmyyyy = getTodaysDate_ddmmyyyy();

  // Using Jquery get id of currentDay
  var $dateEl = $("#currentDay");

  // Update date using dateEl via Jquery
  $dateEl.text(getDateForTopOfWebPage());


  for (var i = 0; i < businessHours.length; i++) {
    var time = businessHours[i].id;

    // Add new div with class: row
    var $row = $("<div>").addClass("row");

    // Add new div with class: col-md-1 time-block
    var $timeBlock = $("<div>").addClass("col-md-1 time-block");
    $timeBlock.append("<p>" + businessHours[i].id + "</p>").addClass("hour");

    // Add textarea code
    var $textareaContainer = $("<textarea>").addClass("col-md-10").attr({ id: time, placeholder: "\u200b" });

    // Create logic for Save button and store in variable
    var $saveButton = $("<div>")
      .addClass("col-md-1 saveBtn center-container")
      .attr("_id", time)
      .append("<i id='saveIcon_" + time + "' class='fas fa-save'></i>")
      .on("click", saveButtonClick);

    // Append all data into one variable
    var $rowTimeLine = $row
      .append($timeBlock)
      .append($textareaContainer)
      .append($saveButton);

    // Select an element with the ID "root-timeblock" from HTML and store in variable 'root'
    var $root = $('#root-timeblock');

    // Append contents of variable, "$rowTimeLine"to "root-timeblock" element.
    $root.append($rowTimeLine);
  }

  // Read data from local storage
  readFromLocalStorage();

  // Display time block colours
  displayTimeBlockColours();

  // Setup timer to call timerFunction every 5 minutes
  var timer = setInterval(timerFuncEvery5Mins, 300000);
})



// Event trigerred when user clicks on saveButton
function saveButtonClick() {
  var $buttonId = $(this).attr("_id");
  var $textEnteredbyUser = $("#" + $buttonId).val();

  updateCalendarData($buttonId, $textEnteredbyUser);
  changeColor("#saveIcon_" + $buttonId);
}


// Updating the colors first time it is called. 
// The function is then called every 5 minutes to see if hour has changed
// and if so the colours are updated
function displayTimeBlockColours() {
  if (savedHour != getCurrentHour()) {

    // Get current hour
    let currentHour = getCurrentHour();

    // Get all time blocks   
    var $textAreas_dataEntry = $(".col-md-10");

    // Parse area of all time blocks
    for (var i = 0; i < $textAreas_dataEntry.length; i++) {

      // Get 24 hour time
      let busHour = parseInt(businessHours[i]["24hrTime"], 10)

      // Compare current hour with 24 hour time  
      if (currentHour > busHour) {
        $($textAreas_dataEntry[i]).addClass("past");
      }
      else if (currentHour == busHour) {
        $($textAreas_dataEntry[i]).addClass("present");
      }
      else {
        $($textAreas_dataEntry[i]).addClass("future");
      }
    }

    savedHour = getCurrentHour();
  }
}


 // Check to see if Calendar structure needs to be reset if new day and then initialises
function checkCalendarStructureForReset() {

  // Read from local storage
  var storedData = localStorage.getItem(localStorage_WorkDaySched);

  if (storedData) {
    // Compare today's date with last stored in local storage
    let calendarData = JSON.parse(storedData);

    // If dates differ then clear it out ready for new day  
    if (calendarData[0].date != todaysDate_ddmmyyyy) {
      // Clear local storage
      clearWorkDayScheduler();
      initialiseCalendarStructure();
    }
  }
}


function initialiseCalendarStructure() {

  // Build Calendar structure dynamically and then write to local storage
  let propertiesString = '{"date":' + '"' + todaysDate_ddmmyyyy + '"';

  for (let i = 0; i < businessHours.length; i++) {
    propertiesString = propertiesString + ", " + '"' + businessHours[i].id + '"' + ':' + '"' + "" + '"';
  }

  propertiesString = propertiesString + "}";

  const propertiesObject = JSON.parse(propertiesString);

  // Initialise calendarData array
  calendarData = [];

  // Adding the object to the array 
  calendarData.push(propertiesObject);
  writeToLocalStorage();
}


// Read calendar data from Local Storage
function readFromLocalStorage() {

  // Check to see if Calendar structure needs to be reset if new day
  checkCalendarStructureForReset();

  var storedData = localStorage.getItem(localStorage_WorkDaySched);

  if (storedData) {
    // Load data into array : calendarData 
    // after constructing the JavaScript value or object described by the string
    calendarData = JSON.parse(storedData);

    // Update textareas with data
    for (var i = 0; i < businessHours.length; i++) {
      let $data = calendarData[0][businessHours[i].id]
      $("#" + businessHours[i].id).append($data);
    }
  }
  else {
    // Initialise structure as running first time
    initialiseCalendarStructure();
  }
}


// Write to Local Storage
function writeToLocalStorage() {

  // Converts the calendarData array to the JSON notation that the value represents
  var jsonCalendarData = JSON.stringify(calendarData);

  // Write to localstorage on key
  localStorage.setItem(localStorage_WorkDaySched, jsonCalendarData);
}


function updateCalendarData(timeEvent, userData) {

  // Check to see if Calendar structure needs to be reset or not
  checkCalendarStructureForReset();

  // Update CalendarData array
  let item = calendarData.find(element => element.date === todaysDate_ddmmyyyy);
  item[timeEvent] = userData;

  // Write to Local Storage
  writeToLocalStorage();
}


// Clear local storage for 'work-day-scheduler'
function clearWorkDayScheduler() {
  // Clear storage based on key 
  localStorage.removeItem(localStorage_WorkDaySched);
}

// This function is called every 5 minutes
// I called it timerFuncEvery5Mins as we may want to put other functions here too !
function timerFuncEvery5Mins() {
  checkCalendarStructureForReset();
  displayTimeBlockColours();
}


// This function is called by ChangeColor. It resets to white icon 
function timerIconColor() {
  clearInterval(timer_for_icon_save);
  $(refer).css('color', 'white');
}


// This function is activated when user clicks on save icon. It displays black icon
function changeColor(timeInterval) {
  refer = timeInterval;
  $(refer).css('color', 'black');
  // After a very short period it calls timerIconFunction which sets icon to white
  timer_for_icon_save = setInterval(timerIconColor, 200);
}
