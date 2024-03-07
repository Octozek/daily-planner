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

    localStorage.setItem(hour, eventText);
    console.log("Saved event for hour " + hour + ": " + eventText);
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