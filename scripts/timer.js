// Timer for question slides
function timer() {
    var t = setInterval(function() {
        var timeHTML = document.getElementById("timer");
        var seconds = parseInt(timeHTML.innerHTML);
        if (seconds <= 1) {
            clearInterval(t);
            dir = getDirection();
            if (dir == 'left') {
                displayResultYes();
            } else if (dir == 'right') {
                displayResultNo();
            }
        }
        seconds--;
        timeHTML.innerHTML = seconds;
    }, 1000);
}

timer();
