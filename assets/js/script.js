const localStorage_WorkDaySched = "work-day-scheduler";

let businessHours = [
  "9am", 
  "10am", 
  "11am", 
  "12am", 
  "1pm", 
  "2pm", 
  "3pm", 
  "4pm", 
  "5pm",
  "6pm",
  "7pm"
]   

let calendarData = [];


const today=dayjs();
const dayWeek = today.format("dddd"); // returns day of week (eg. 'Friday')
const currentMonth = today.format('MMMM'); // eg. January
const currentDay = today.format('D');  // eg. 19 (ie. day of month)

// using Jquery get id of currentDay
var dateEl = $("#currentDay");

let todaysDate_ddmmyyyy = today.format("DD/MM/YYYY");



$(document).ready(function() {

  // update date using dateEl via Jquery
  dateEl.text(dayWeek + ", " + currentMonth + " " + currentDay);



  for (var i = 0; i < businessHours.length; i++) {
    //var $time = businessHours[i].displayTime;
    var $time = businessHours[i];

    // Add new div with class: row
    var $row = $("<div>").addClass("row");

    // Add new div with class: col-md-1 time-block
    var $timeBlock = $("<div>").addClass("col-md-1 time-block time-block");   
    $timeBlock.append("<p>" + businessHours[i] + "</p>");

    var $textareaContainer = $("<textarea>").addClass("col-md-10").attr({ id: $time, rows: 2, cols: 100 });

    var $saveButton = $("<div>")
      .addClass("col-md-1 saveBtn center-container")
      .attr("id", $time)
      .append("<i class='fas fa-save'></i>")
      .on("click", saveButtonClick);

    
      // Append all data into one variable
    var $rowTimeLine =  $row
      .append($('<div>').addClass('time-block-container')) // Add space at top
      .append($timeBlock)
      .append($textareaContainer)
      .append($saveButton);


    // Select an element with the ID "root-timeblock" from HTML and store in variable 'root'
    var root = $('#root-timeblock');

    // Append contents of variable, "$rowTimeLine"to "root-timeblock" element.
    root.append($rowTimeLine);
  }



  displayTimeBlockColors();

  
})





// Event trigerred when user clicks on saveButton
function saveButtonClick() {
  var $buttonId   = $(this).attr("id");
  var $textEnteredbyUser = $("#" + $buttonId).val();
  updateCalendarData("20/01/2024", $buttonId, $textEnteredbyUser);
}


function displayTimeBlockColors() {

  const currentHour = today.hour();

  var textAreas_dataEntry = $(".col-md-10");

  for (var i = 0; i < textAreas_dataEntry.length; i++) {
    if (currentHour > businessHours[i]) {
      $(textAreas_dataEntry[i]).addClass("past");
    }
    else if (currentHour == businessHours[i]) {
      $(textAreas_dataEntry[i]).addClass("present");
    }
    else {
      $(textAreas_dataEntry[i]).addClass("future");
    }
  }
}




function checkCalendarStructure() {

  // read from local storage
  var storedData = localStorage.getItem(localStorage_WorkDaySched);
  if (storedData)
  {
    // compare today's date with last stored in local storage
    calendarData = JSON.parse(storedData);

    // if dates differ then clear it out ready for new day  
    if (calendarData[0].date != todaysDate_ddmmyyyy )
    {
      // clear local storage
      clearWorkDayScheduler();
      
      // initialise calendar for today    
      initialiseCalendarStructure();    
    }
  }
  else
  {
    console.log("");
    // this has never been run before so initialise calendar structure
    initialiseCalendarStructure();
  }
}



function initialiseCalendarStructure() {

  //let propertiesString = '{"date":' + '"20/01/2024"';
  let propertiesString = '{"date":' + '"' + todaysDate_ddmmyyyy + '"';

  
  for (let i = 0; i < businessHours.length; i++) {
    propertiesString = propertiesString + ", "  + '"' + businessHours[i] + '"' + ':' + '"' + "" + '"';
  }

  propertiesString = propertiesString + "}";

  const propertiesObject = JSON.parse(propertiesString);

  // Initialise calendarData array
  calendarData = [];

  // Adding the object to the array 
  calendarData.push(propertiesObject);
  writeToLocalStorage();

}




function readFromLocalStorage() {

  var storedData = localStorage.getItem(localStorage_WorkDaySched);

  if (storedData) {
    // load data into array : calendarData 
    // after constructing the JavaScript value or object described by the string
    calendarData = JSON.parse(storedData);

    for (var i = 0; i < businessHours.length; i++) {
      let $data = calendarData[0][businessHours[i]]
      $("#" + businessHours[i]).append($data);
    }       
  }
}


function writeToLocalStorage() {
    
  checkCalendarStructure();
  
  // Converts the calendarData array to the JSON notation that the value represents
  var jsonCalendarData = JSON.stringify(calendarData);

  // Write to localstorage on key
  localStorage.setItem(localStorage_WorkDaySched, jsonCalendarData);    
}


function updateCalendarData(dateEvent, timeEvent, userData) {
  let item = calendarData.find(element => element.date === dateEvent);
  item[timeEvent] = userData;

  writeToLocalStorage();
 
}


// Clear local storage for 'work-day-scheduler'
function clearWorkDayScheduler() {
  // Clear storage based on key 
  localStorage.removeItem(localStorage_WorkDaySched);
}



// this is only run once the page Document Object Model (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
  // checkCalendarStructure();
  //readFromLocalStorage();
})



