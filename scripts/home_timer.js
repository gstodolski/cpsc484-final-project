// Timer to return home after recommendation
function timer() {
    var t = setInterval(function() {
        var timeHTML = document.getElementById("home_timer");
        var seconds = parseInt(timeHTML.innerHTML);
        if (seconds <= 1) {
            clearInterval(t);
            if (window.location.pathname.indexOf("/Recommendation.html") != -1) {
                window.location.href = "index.html";
            } else if (window.location.pathname.indexOf("/instructions.html") != -1) {
                if (closest_person !== null) {
                    window.location.href = "question.html";
                }
                else{
                    window.location.href = "index.html";
                }
            }
        }
        seconds--;
        timeHTML.innerHTML = seconds;
    }, 1000);
}

timer();
