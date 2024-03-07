// script.js
function updateBlocks() {
    var currentTime = dayjs().hour();
  
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id"));
  
      if (blockHour < currentTime) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentTime) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  
    // Highlight current hour in aqua
    $(".present").css("background-color", "aqua");
  }
  
  $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("id");
    var eventText = $(this).siblings("textarea").val();
  
    localStorage.setItem(hour, eventText);
  });
  
  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id");
      var savedEvent = localStorage.getItem(hour);
  
      if (savedEvent !== null) {
        $(this).children("textarea").val(savedEvent);
      }
    });
  }
  
  function displayCurrentDay() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text("Today is " + currentDate);
  }
  
  $(document).ready(function () {
    displayCurrentDay();
    loadEvents();
    updateBlocks();
  
    setInterval(function () {
      updateBlocks();
    }, 60000);
  });