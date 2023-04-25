// Adapted from https://p5js.org/examples/interaction-snake-game.html
// Also adapted from Yale-CPSC484-HCI/demo-p5js repo


var host = "cpsc484-01.yale.internal:8888";
$(document).ready(function() {
 frames.start();
 twod.start();
});

var closest_person = null;

var frames = {
 socket: null,


 start: function() {
   var url = "ws://" + host + "/frames";
   frames.socket = new WebSocket(url);
   frames.socket.onmessage = function (event) {
     var frame = JSON.parse(event.data);
     closest_person = frames.find_closest_person(frame);
     if (window.location.pathname.indexOf("/index.html") != -1) {
       if (closest_person !== null) {
        window.location.href = "instructions.html";
       }
     }
     var command = frames.get_command(frame);
     if (command !== null) {
       sendCommand(command);
     }
   }
 },


 is_raising_hands: function (frame) {
   var is_raising_hands = false;
   if (frame.people.length < 1) {
     return is_raising_hands;
   }


   person = frames.find_closest_person(frame);


   // Normalize by subtracting the root (neck) joint coordinates
   var neck_y = person.joints[3].position.y;
   var left_wrist_y = (person.joints[7].position.y - neck_y) * -1;
   var right_wrist_y = (person.joints[14].position.y - neck_y) * -1;


   if (right_wrist_y > 0 && left_wrist_y > 0) {
     is_raising_hands = true; // QUIT
   }
   return is_raising_hands;
 },


 get_pelvis_command: function (frame) {
   var command = null;
   if (frame.people.length < 1) {
     return command;
   }


   person = frames.find_closest_person(frame);


   // Normalize by subtracting the root (pelvis) joint coordinates
   var pelvis_x = person.joints[0].position.x;
   var pelvis_y = person.joints[0].position.y;
   var pelvis_z = person.joints[0].position.z;
   // console.log("X: " + pelvis_x + ", Y: " + pelvis_y + ", Z: " + pelvis_z);


   // If the person is too far away, don't do anything
   if (pelvis_z > 2500) {
     return command;
   }


   if (pelvis_x > 0) {
     command = 1; // LEFT
   } else if (pelvis_x < 0) {
     command = 2; // RIGHT
   }
   return command;
 },

  get_command: function (frame) {
   var command = null;
   if (frames.is_raising_hands(frame) == true) {
     command = 99; // QUIT
   } else {
     command = frames.get_pelvis_command(frame);
   }
   return command;
 },


 find_closest_person: function (frame) {
   var closest_person = null;
   var closest_distance = 100000000;
   if (frame.people) {
     for (var i = 0; i < frame.people.length; i++) {
       var person = frame.people[i];
       var distance = person.y_pos;
       if (distance < closest_distance) {
         closest_distance = distance;
         closest_person = person;
       }
     }
   }
   return closest_person;
 }
};


var twod = {
 socket: null,


 start: function() {
   var url = "ws://" + host + "/twod";
   twod.socket = new WebSocket(url);
   twod.socket.onmessage = function(event) {
     twod.show(JSON.parse(event.data));
   }
 },


 show: function(twod) {
   $('.twod').attr("src", 'data:image/pnjpegg;base64,'+twod.src);
 }
};


function sendCommand(command) {
 switch (command) {
   case 1:
     direction = 'left';
     break;
   case 2:
     direction = 'right';
     break;
   case 99:
     window.location.href = "quit.html";
     break;
 }
}


function getDirection() {
 return direction;
}


// Controls what question is being displayed
let current_question = document.getElementById("question_general");


// Controls what the final result (club recommendation) is
let final_result;


// Keeps track of how many questions have been asked
let counter_element = document.getElementById("counter");
let counter = 1;
let timer_element = document.getElementById("timer");


// Keeps track of the user's response to the question
let direction = 'left';


// Determines what the next question is if user responds "yes"
function displayResultYes() {
 if (current_question.innerHTML == "Do you enjoy volunteering and community service?") {
   current_question.innerHTML = "Do you want to network and/or mentor other CS majors?";
 }
 else if (current_question.innerHTML == "Do you want to network and/or mentor other CS majors?") {
   current_question.innerHTML = "Do you identify as a woman or gender minority?";
 }
 else if (current_question.innerHTML == "Would you like to host and participate in competitions?") {
   current_question.innerHTML = "Are you interested in quantum computing?";
 }
 else if (current_question.innerHTML == "Do you identify as a woman or gender minority?") {
   final_result = "WGiCS";
 }
 else if (current_question.innerHTML == "Are you interested in the intersection between computer science and the visual arts?") {
   final_result = "Design@Yale";
 }
 else if (current_question.innerHTML == "Are you interested in quantum computing?") {
   final_result = "YuQC";
 }
 else if (current_question.innerHTML == "Are you interested in maintaining Yale websites like 'Yale Menus' or 'CourseTable'?") {
   final_result = "YCS";
 }
 counter++;
 endQuestions();
}


// Determines what the next question is if user responds "no"
function displayResultNo() {
 if (current_question.innerHTML == "Do you enjoy volunteering and community service?") {
   current_question.innerHTML = "Would you like to host and participate in competitions?";
 }
 else if (current_question.innerHTML == "Do you want to network and/or mentor other CS majors?") {
   current_question.innerHTML = "Are you interested in the intersection between computer science and the visual arts?";
 }
 else if (current_question.innerHTML == "Would you like to host and participate in competitions?") {
   current_question.innerHTML = "Are you interested in maintaining Yale websites like 'Yale Menus' or 'CourseTable'?";
 }
 else if (current_question.innerHTML == "Do you identify as a woman or gender minority?") {
   final_result = "DSAC";
 }
 else if (current_question.innerHTML == "Are you interested in the intersection between computer science and the visual arts?") {
   final_result = "CodeHaven";
 }
 else if (current_question.innerHTML == "Are you interested in quantum computing?") {
   final_result = "YHack";
 }
 else if (current_question.innerHTML == "Are you interested in maintaining Yale websites like 'Yale Menus' or 'CourseTable'?") {
   final_result = "Y-IEEE";
 }
 counter++;
 counter_element.innerHTML = counter;
 endQuestions();
}


// Remove button when counter is at 3
function endQuestions() {
 if (counter == 4) {
   document.getElementById("button_yes").style.display = "none";
   document.getElementById("button_no").style.display = "none";
   window.location.href = "Recommendation.html?club=" + final_result;
 } else {
   counter_element.innerHTML = counter;
   setTimeout(function() {
     timer_element.innerHTML = 15;
     timer();
   }, 1);
 }
}


function onLoad() {
 let searchParams = new URLSearchParams(window.location.search);
 let club = searchParams.get("club");
 document.getElementById("results").innerHTML = club;
 displayClubQR(club);
}


function displayClubQR(club) {
 if (club == "WGiCS") {
   document.getElementById("QRcode").src = "images/WGICS_QR.png";
   document.getElementById("clubImg").src = "images/WG_CLUB.png";
   document.getElementById("blurb").innerHTML = "Women and Gender Minorities in CS: A welcoming community that plans programs and events, encourages students to discover new opportunities, develops technical skills, and most importantly, builds long-lasting friendships.";
   document.getElementById("club_caption").innerHTML = "Club picture courtesy of WGiCS website";
}
 else if (club == "Design@Yale") {
   document.getElementById("QRcode").src = "images/DESIGN_QR.png";
   document.getElementById("clubImg").src = "images/D@Y_CLUB.png";
   document.getElementById("blurb").innerHTML = "Desgin@Yale: A design studio that hosts events exploring practice & industry across design disciplines and likes to have fun & make things together.";
   document.getElementById("club_caption").innerHTML = "Sample designs courtesy of Design@Yale website";
}
 else if (club == "YuQC") {
   document.getElementById("QRcode").src = "images/YUQC_QR.png";
   document.getElementById("clubImg").src = "images/YUQC_CLUB.png";
   document.getElementById("blurb").innerHTML = "Yale Undergraduate Quantum Computing Club: An undergraduate academic organization sponsored by the Yale Quantum Institute, formed to promote and facilitate the participation of undergraduates in quantum information science at Yale.";
   document.getElementById("club_caption").innerHTML = "Club logo courtesy of YuQC website";
}
 else if (club == "YCS") {
   document.getElementById("QRcode").src = "images/YCS_QR.png";
   document.getElementById("clubImg").src = "images/YCS_CLUB.png";
   document.getElementById("blurb").innerHTML = "Yale Computer Society: Offers development projects for real-world SWE experience, and hosts hack nights, social events, speaker events with industry professionals";
   document.getElementById("club_caption").innerHTML = "Club picture courtesy of Facebook";
}
 else if (club == "DSAC") {
   document.getElementById("QRcode").src = "images/DSAC_QR.png";
   document.getElementById("clubImg").src = "images/DSAC_CLUB.png";
   document.getElementById("blurb").innerHTML = "Computer Science Departmental Student Advisory Committee: represents Yale CS students to the faculty and administration, meeting with the Director of Undegraduate Studies and Department Chair several times a year.";
   document.getElementById("club_caption").innerHTML = "Club picture courtesy of DSAC website";
}
 else if (club == "CodeHaven") {
   document.getElementById("QRcode").src = "images/CODEHAVEN_QR.png";
   document.getElementById("clubImg").src = "images/CH_CLUB.png";
   document.getElementById("blurb").innerHTML = "CodeHaven: An undergraduate organization that connects New Haven middle school students with Yalies interested in computer science throughout the school year.";
   document.getElementById("club_caption").innerHTML = "Club picture courtesy of Yale Daily News";
}
 else if (club == "YHack") {
   document.getElementById("QRcode").src = "images/YHACK_QR.png";
   document.getElementById("clubImg").src = "images/YHACK_CLUB.png";
   document.getElementById("blurb").innerHTML = "YHack: Yale's largest hackathon, where students from all over the world come together to explore new technologies, collaborate with others, and create innovative projects.";
   document.getElementById("club_caption").innerHTML = "Club picture courtesy of YHack website";
}
 else if (club == "Y-IEEE") {
   document.getElementById("QRcode").src = "images/YIEEE_QR.png";
   document.getElementById("clubImg").src = "images/YIEEE_CLUB.png";
   document.getElementById("blurb").innerHTML = "Y-IEEE: Yale's chapter of the Institute of Electrical and Electronics Engineers, the world's largest technical professional organization for the advancement of technology.";
   document.getElementById("club_caption").innerHTML = "Club picture courtesy of Y-IEEE website";
}
}
