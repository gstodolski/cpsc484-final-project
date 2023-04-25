let slideIndex = [1,1,1];
let slideId = ["mySlides1", "mySlides2", "mySlides3"]
let show_times = [2000, 2300, 3100]
const timers = [];
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);

function showSlides(n, show_no) {
  let i;
  let x = document.getElementsByClassName(slideId[show_no]);
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
slideIndex[show_no]++;
  if (slideIndex[show_no] > x.length) {slideIndex[show_no] = 1}    
  if (slideIndex[show_no] < 1) {slideIndex[show_no] = x.length}
  x[slideIndex[show_no]-1].style.display = "block";

  myTimeout = setTimeout(function() {
    showSlides(slideIndex[show_no], show_no)
}, show_times[show_no]);

timers.push(myTimeout);

}

function stopSlides() {
    for (let i = 0; i < timers.length; i++) {
        clearTimeout(timers[i])
    }
  }

function restartSlides() {
    showSlides(1, 0);
    showSlides(1, 1);
    showSlides(1, 2);
}

function display_question() {
    //On success, proceed to the question stage
    window.location.href = "instructions.html";
}

function return_home(){
    // On failure, reset the popup to its original state
    // Restart the slides of the home page
    document.getElementById("return_home").click();
    window.location.href = "index.html";
}

function success_calibration() {
    image_x = document.getElementById("arrow-image");
    image_x.parentNode.removeChild(image_x);
    document.getElementById("popup-title").innerHTML = "Calibration Successful";
    document.getElementById("popup-message").innerHTML = "Great, now onto the trivia!";
    document.getElementById("popup-message").style.fontSize="40px";
    document.getElementById("time_rem").innerHTML = "";
    setTimeout(display_question, 4000);
}

function failed_calibration() {
    image_x = document.getElementById("arrow-image");
    image_x.parentNode.removeChild(image_x);
    document.getElementById("popup-title").innerHTML = "Calibration Unsuccessful";
    document.getElementById("popup-message").innerHTML = "Sorry we were unable to detect your movement to the left. The home screen will be displayed allowing you to try again.";
    document.getElementById("popup-message").style.fontSize="40px";
    document.getElementById("time_rem").innerHTML = "";
    //Restart by showing home screen after a timeout
    setTimeout(return_home, 5000);
}

// Timer for calibration slide
function calibration_timer() {
    var t = setInterval(function() {
        var timeHTML = document.getElementById("calibration_timer");
        var seconds = parseInt(timeHTML.innerHTML);
        if (seconds <= 1) {
            clearInterval(t);
            dir = getDirection();
            if (dir == 'left') {
                success_calibration();
            } else {
                failed_calibration();
            }
        }
        seconds--;
        timeHTML.innerHTML = seconds;
    }, 1000);
}
