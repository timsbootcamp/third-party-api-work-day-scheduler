// Define Business Hours Array
//let businessHours = ["9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm"];

let businessHours = [
  { id: "9", displayTime: "9am"}, 
  { id: "10", displayTime: "10am"}, 
  { id: "11", displayTime: "11am"}, 
  { id: "12", displayTime: "12am"}, 
  { id: "13", displayTime: "1pm"}, 
  { id: "14", displayTime: "2pm"}, 
  { id: "15", displayTime: "3pm"}, 
  { id: "16", displayTime: "4pm"}, 
  { id: "17", displayTime: "5pm"}
]   



const today=dayjs();
const dayWeek = today.format("dddd"); // returns day of week (eg. 'Friday')
const currentMonth = today.format('MMMM'); // eg. January
const currentDay = today.format('D');  // eg. 19 (ie. day of month)

// using Jquery get id of currentDay
var dateEl = $("#currentDay");

// update date using dateEl via Jquery
dateEl.text(dayWeek + ", " + currentMonth + " " + currentDay);




for (var i = 0; i < businessHours.length; i++) {
  //var $time = businessHours[i].displayTime;

  // Add new div with class: row
  var $row = $("<div>").addClass("row");

  // Add new div with class: col-md-1 time-block
  var $timeBlock = $("<div>").addClass("col-md-1 time-block time-block").attr("id", businessHours[i].id);  
  $timeBlock.append("<p>" + businessHours[i].displayTime + "</p>");


  // Add new div with class: col-md-10
  //var backcolorTextArea = "gray-background";
  //var $textareaContainer = $("<textarea>").addClass("col-md-10 border-top-blank " + backcolorTextArea );
  var $textareaContainer = $("<textarea>").addClass("col-md-10 border-top-blank ");

  //$textareaContainer.append($("<textarea>").attr({ id: $time, rows: 2, cols: 100 }));

  var $saveButton = $("<div>")
    .addClass("col-md-1 saveBtn center-container")
    .attr("id", businessHours[i].id)
    .append("<i class='fas fa-save'></i>")
    .on("click", saveButtonClick);

  
    // Append all data into one variable
  var $rowTimeLine = $row
    .append($('<div>').addClass('time-block-container')) // Add space at top
    .append($timeBlock)
    .append($textareaContainer)
    .append($saveButton);


  // Select an element with the ID "root-timeblock" from HTML and store in variable 'root'
  var root = $('#root-timeblock');

  // Append contents of variable, "$rowTimeLine"to "root-timeblock" element.
  root.append($rowTimeLine);
}




// Event trigerred when user clicks on saveButton
function saveButtonClick() {
  var $buttonId   = $(this).attr("id");
  var $textEnteredbyUser = $("#" + $buttonId).val();
  alert("Save clicked. " + $buttonId + " " + $textEnteredbyUser);
}


var timeBlock = $(".time-block");
const currentHour = today.hour();

var textAreas_dataEntry = $(".col-md-10");

for (var i = 0; i < textAreas_dataEntry.length; i++) {

  if (currentHour > businessHours[i].id) {
    $(textAreas_dataEntry[i]).addClass("past");
  }
  else if (currentHour == businessHours[i].id) {
    $(textAreas_dataEntry[i]).addClass("present");
  }
  else {
    $(textAreas_dataEntry[i]).addClass("future");
  }

}