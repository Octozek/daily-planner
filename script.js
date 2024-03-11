// Function to update time block styles based on the current time
function updateBlocks() {
    var currentTime = dayjs().hour();

    // Iterate over each time block
    $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("id"));

        // Apply past, present, or future class based on the current time
        if (blockHour < currentTime) {
            $(this).addClass("past").removeClass("present future");
        } else if (blockHour === currentTime) {
            $(this).addClass("present").removeClass("past future");
        } else {
            $(this).addClass("future").removeClass("past present");
        }
    });
}

// Event handler for saving text to local storage
$(".saveBtn").on("click", function () {
    var hour = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings("textarea").val();

    // Remove old value from local storage and save the new text
    localStorage.removeItem(hour);
    localStorage.setItem(hour, eventText);

    // Display a message when an appointment is saved
    showMessage("Appointment added to local storage!");

    // Load events after saving the new text
    loadEvents();
});

// Function to load events from local storage
function loadEvents() {
    $(".time-block").each(function () {
        var hour = $(this).attr("id");
        var savedEvent = localStorage.getItem(hour);

        // Populate textarea with saved event if exists
        if (savedEvent !== null) {
            $(this).find("textarea").val(savedEvent);
        }
    });
}

// Function to display the current day
function displayCurrentDay() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text("Today is " + currentDate);
}

// Function to show temporary message on the page
function showMessage(message) {
    var alertElement = $('<div class="alert alert-light text-center position-absolute w-100 alert-transparent" style="z-index: 1000;">' + message + '</div>');
    alertElement.insertAfter($('header'));
    setTimeout(function () {
        alertElement.remove();
    }, 3000);
}

// Initial actions when the document is ready
$(document).ready(function () {
    displayCurrentDay();
    updateBlocks();
    setTimeout(function () {
        loadEvents();
    }, 100);

    // Set up an interval to update blocks every minute
    setInterval(function () {
        updateBlocks();
    }, 60000);
});