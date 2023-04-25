// Timer to return home after recommendation
function timer() {
    var t = setInterval(function() {
    var timeHTML = document.getElementById("home_timer");
    var seconds = parseInt(timeHTML.innerHTML);
    if (seconds <= 1) {
        clearInterval(t);
        window.location.href = "index.html";
    }
    seconds--;
    timeHTML.innerHTML = seconds;
    }, 1000);
}

timer();