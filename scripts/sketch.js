// Adapted from https://p5js.org/examples/interaction-snake-game.html
// Also adapted from Yale-CPSC484-HCI/demo-p5js repo

// var host = "cpsc484-01.yale.internal:8888";
var host = "localhost:4444";
$(document).ready(function() {
  frames.start();
  twod.start();
});

var frames = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/frames";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      var command = frames.get_command(JSON.parse(event.data));
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

    // Normalize by subtracting the root (pelvis) joint coordinates
    var neck_x = frame.people[0].joints[3].position.x;
    var neck_y = frame.people[0].joints[3].position.y;
    var neck_z = frame.people[0].joints[3].position.z;
    var left_wrist_x = (frame.people[0].joints[7].position.x - neck_x) * -1;
    var left_wrist_y = (frame.people[0].joints[7].position.y - neck_y) * -1;
    var left_wrist_z = (frame.people[0].joints[7].position.z - neck_z) * -1;
    var right_wrist_x = (frame.people[0].joints[14].position.x - neck_x) * -1;
    var right_wrist_y = (frame.people[0].joints[14].position.y - neck_y) * -1;
    var right_wrist_z = (frame.people[0].joints[14].position.z - neck_z) * -1;

    if (right_wrist_y > 500 && left_wrist_y > 500) {
      is_raising_hands = true; // QUIT
    }
    return is_raising_hands;
  },

  get_pelvis_command: function (frame) {
    var command = null;
    if (frame.people.length < 1) {
      return command;
    }

    // Normalize by subtracting the root (pelvis) joint coordinates
    var pelvis_x = frame.people[0].joints[0].position.x;
    var pelvis_y = frame.people[0].joints[0].position.y;
    var pelvis_z = frame.people[0].joints[0].position.z;

    if (pelvis_z < 100) {
      return command;
    }

    if (pelvis_y < 500 && pelvis_y > 100) {
      if (pelvis_x > 200) {
        command = 1; // RIGHT
      } else if (pelvis_x < -200) {
        command = 2; // LEFT
      }
    }
    return command;
  },
  
  get_command: function (frame) {
    var command = null;
    if (frame.is_raising_hands == true) {
      command = 99; // QUIT
    } else {
      command = frame.get_pelvis_command;
    }
    return command;
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
      direction = 'right';
      break;
    case 2:
      direction = 'left';
      break;
    case 99:
      window.location.href = "quit.html";
      break;
  }
  console.log(direction);
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
  }
  else if (club == "Design@Yale") {
    document.getElementById("QRcode").src = "images/DESIGN_QR.png";
    document.getElementById("clubImg").src = "images/D@Y_CLUB.png"; 
    document.getElementById("blurb").innerHTML = "Desgin@Yale: A design studio that hosts events exploring practice & industry across design disciplines and likes to have fun & make things together.";
  }
  else if (club == "YuQC") {
    document.getElementById("QRcode").src = "images/YUQC_QR.png";
    document.getElementById("clubImg").src = "images/YUQC_CLUB.png"; 
    document.getElementById("blurb").innerHTML = "Yale Undergraduate Quantum Computing Club: An undergraduate academic organization sponsored by the Yale Quantum Institute, formed to promote and facilitate the participation of undergraduates in quantum information science at Yale.";
  }
  else if (club == "YCS") {
    document.getElementById("QRcode").src = "images/YCS_QR.png";
    document.getElementById("clubImg").src = "images/YCS_CLUB.png";
    document.getElementById("blurb").innerHTML = "Yale Computer Society: Offers development projects for real-world SWE experience, and hosts hack nights, social events, speaker events with industry professionals";
  }
  else if (club == "DSAC") {
    document.getElementById("QRcode").src = "images/DSAC_QR.png";
    document.getElementById("clubImg").src = "images/DSAC_CLUB.png";
    document.getElementById("blurb").innerHTML = "Computer Science Departmental Student Advisory Committee: represents Yale CS students to the faculty and administration, meeting with the Director of Undegraduate Studies and Department Chair several times a year.";
  }
  else if (club == "CodeHaven") {
    document.getElementById("QRcode").src = "images/CODEHAVEN_QR.png";
    document.getElementById("clubImg").src = "images/CH_CLUB.png";
    document.getElementById("blurb").innerHTML = "CodeHaven: An undergraduate organization that connects New Haven middle school students with Yalies interested in computer science throughout the school year."; 
  }
  else if (club == "YHack") {
    document.getElementById("QRcode").src = "images/YHACK_QR.png";
    document.getElementById("clubImg").src = "images/YHACK_CLUB.png";
    document.getElementById("blurb").innerHTML = "YHack: Yale's largest hackathon, where students from all over the world come together to explore new technologies, collaborate with others, and create innovative projects.";
  }
  else if (club == "Y-IEEE") {
    document.getElementById("QRcode").src = "images/YIEEE_QR.png";
    document.getElementById("clubImg").src = "images/YIEEE_CLUB.png";
    document.getElementById("blurb").innerHTML = "Y-IEEE: Yale's chapter of the Institute of Electrical and Electronics Engineers, the world's largest technical professional organization for the advancement of technology.";
  }
}
