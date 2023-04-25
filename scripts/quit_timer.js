// Timer for quit slides
function timer() {
    var t = setInterval(function() {
    var timeHTML = document.getElementById("quit_timer");
    var seconds = parseInt(timeHTML.innerHTML);
    if (seconds <= 1) {
        clearInterval(t);
        // dir = getDirection();
        // if (dir == 'left') {
        //     // quit();
        // } else if (dir == 'right') {
        //     window.location.href = "question.html";
        // }
        window.location.href = "index.html";
    }
    seconds--;
    timeHTML.innerHTML = seconds;
    }, 1000);
}

timer();
