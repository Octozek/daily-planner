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
    var hour = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings("textarea").val();

    // Remove the old value from local storage, if any
    localStorage.removeItem(hour);

    // Save the new text to local storage
    localStorage.setItem(hour, eventText);
    
    // Display a message when an appointment is saved
    showMessage("Appointment added to local storage!");
    // Load events after saving the new text
    loadEvents();
});

function loadEvents() {
    $(".time-block").each(function () {
        var hour = $(this).attr("id");
        var savedEvent = localStorage.getItem(hour);

        if (savedEvent !== null) {
            console.log("Loaded event for hour " + hour + ": " + savedEvent);
            $(this).find("textarea").val(savedEvent);
        }
    });
}

function displayCurrentDay() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text("Today is " + currentDate);
}

function showMessage(message) {
    // Create a new alert element
    var alertElement = $('<div class="alert alert-light text-center position-absolute w-100">' + message + '</div>');

    // Insert the alert after the header and before the first hourly block
    alertElement.insertAfter($('header'));

    // Remove the alert after 3 seconds
    setTimeout(function () {
        alertElement.remove();
    }, 3000);
}

$(document).ready(function () {
    displayCurrentDay();
    updateBlocks();

    // Call loadEvents after a short delay to ensure the DOM is fully loaded
    setTimeout(function () {
        loadEvents();
        console.log("loadEvents called after delay");
    }, 100);

    setInterval(function () {
        updateBlocks();
    }, 60000);
});