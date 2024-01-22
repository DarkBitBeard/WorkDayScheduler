$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function() {
    // Use DOM traversal to get the "hour-x" id of the time-block
    var timeBlockId = $(this).closest(".time-block").attr("id");
    // Save the user input in local storage using the time block ID
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour using Day.js
  var currentHour = dayjs().hour();

  // Loop through each time block and apply past, present, or future class
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // Loop through each time block and set the textarea values from local storage
  $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var savedInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(savedInput);
  });

  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
