// Timer for question slides

function timer() {
    var t = setInterval(function() {
        var boxL = document.getElementsByClassName("camera1")[0];
        var boxR = document.getElementsByClassName("camera2")[0];
        var timeHTML = document.getElementById("timer");
        var seconds = parseInt(timeHTML.innerHTML);
        console.log(direction);
        if(direction == "left"){
            boxL.style.background = "red";
            boxR.style.background = "grey";
        }
        else if(direction == "right"){
            boxL.style.background = "grey";
            boxR.style.background = "red";
        }
    
        if (seconds <= 1) {
            clearInterval(t);
            dir = getDirection();
            boxL.style.background = "grey";
            boxR.style.background = "grey";
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
