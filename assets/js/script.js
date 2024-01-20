const today=dayjs();
const dayWeek = today.format("dddd"); // returns day of week (eg. 'Friday')
const currentMonth = today.format('MMMM'); // eg. January
const currentDay = today.format('D');  // eg. 19 (ie. day of month)

// using Jquery get id of currentDay
var dateEl = $("#currentDay");

// update date using dateEl via Jquery
dateEl.text(dayWeek + ", " + currentMonth + " " + currentDay);


// Dynamically add 9am to html - BEGIN

// Add new div with class: row
var $row = $("<div>").addClass("row");

// Add new div with class: col-md-1 time-block
var $timeBlock = $("<div>").addClass("col-md-1 time-block");
$timeBlock.append("<p>9AM</p>");



// Add new div with class: col-md-10
var backcolorTextArea = "gray-background";
var $textareaContainer = $("<div>").addClass("col-md-10 border-top-blank " + backcolorTextArea );
var $time = "9am";
$textareaContainer.append($("<textarea>").attr({ id: $time, rows: 2, cols: 100 }));

var $saveButton = $("<div>")
  .addClass("col-md-1 saveBtn center-container")
  .attr("id", $time)
  .append("<i class='fas fa-save'></i>");


// Append all data into one variable
var $rowTimeLine = $row
  .append($timeBlock)
  .append($textareaContainer)
  .append($saveButton);

// Select an element with the ID "root-timeblock" from HTML and store in variable 'root'
var root = $('#root-timeblock');

// Append contents of variable, "$rowTimeLine"to "root-timeblock" element.
root.append($rowTimeLine);

// Dynamically add 9am to html - END

