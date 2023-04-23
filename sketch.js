
// Controls what question is being displayed
let current_question = document.getElementById("question_general");

// Controls what the final result (club recommendation) is
let final_result = document.getElementById("results");

let counter_element = document.getElementById("counter");
let counter = 0;

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
        final_result.innerHTML = "WGiCS";
    }
    else if (current_question.innerHTML == "Are you interested in the intersection between computer science and the visual arts?") {
        final_result.innerHTML = "Design@Yale";
    }
    else if (current_question.innerHTML == "Are you interested in quantum computing?") {
        final_result.innerHTML = "YuQC";
    }
    else if (current_question.innerHTML == "Are you interested in maintaining Yale websites like 'Yale Menus' or 'CourseTable'?") {
        final_result.innerHTML = "YCS";
    }
    counter ++;
    counter_element.innerHTML = counter;
    removeButton();
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
        final_result.innerHTML = "DSAC";
    }
    else if (current_question.innerHTML == "Are you interested in the intersection between computer science and the visual arts?") {
        final_result.innerHTML = "CodeHaven";
    }
    else if (current_question.innerHTML == "Are you interested in quantum computing?") {
        final_result.innerHTML = "YHack";
    }
    else if (current_question.innerHTML == "Are you interested in maintaining Yale websites like 'Yale Menus' or 'CourseTable'?") {
        final_result.innerHTML = "Y-IEEE";
    }
    counter++;
    counter_element.innerHTML = counter;
    removeButton();
}

// Remove button when counter is at 3
function removeButton() {
    if (counter == 3) {
        document.getElementById("button_yes").style.display = "none";
        document.getElementById("button_no").style.display = "none";
    }
}



// Adapted from https://p5js.org/examples/interaction-snake-game.html
// Also adapted from Yale-CPSC484-HCI/demo-p5js repo

/* var host = "localhost:4444";
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
      var command = frames.get_right_wrist_command(JSON.parse(event.data));
      if (command !== null) {
        sendWristCommand(command);
      }
    }
  },

  is_raising_hands: function (frame) {
    var command = null;
    if (frame.people.length < 1) {
      return command;
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

    if (left_wrist_z && right_wrist_z < 100) {
      return command;
    }

    if (right_wrist_y > 500 && left_wrist_y > 500) {
      command = 100; // QUIT
    } else {
      command = 1; // NOT QUIT
    }
    return command;
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
        command = 76; // RIGHT
      } else if (pelvis_x < -200) {
        command = 74; // LEFT
      }
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
// the snake is divided into small segments, which are drawn and edited on each 'draw' call
let numSegments = 10;
let direction = 'right';

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;
let scoreElem;
let scoreContainer = document.getElementById('score-container');
let handContainer = document.getElementById('hand-container');

let leftArrow = document.getElementById('left-arrow');
let rightArrow = document.getElementById('right-arrow');
let upArrow = document.getElementById('up-arrow');
let downArrow = document.getElementById('down-arrow');

let startButton = document.getElementById('start-button');
startButton.addEventListener("click", () => {
  window.location.reload();
});

function setup() {
  let snakeCanvas = createCanvas(windowWidth/2, windowHeight/2);
  snakeCanvas.parent("canvas-container");
  frameRate(3);
  stroke(255);
  strokeWeight(10);
  updateFruitCoordinates();

  scoreElem = createDiv('Score = 0');
  scoreElem.parent("score-container");
  scoreElem.id = 'score';

  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background('#b1d1fc');
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    stroke('#c1f80a');
  }
  updateSnakeCoordinates();
  updateHandContainer();
  checkGameStatus();
  checkForFruit();
} */

/*
 The segments are updated based on the direction of the snake.
 All segments from 0 to n-1 are just copied over to 1 till n, i.e. segment 0
 gets the value of segment 1, segment 1 gets the value of segment 2, and so on,
 and this results in the movement of the snake.

 The last segment is added based on the direction in which the snake is going,
 if it's going left or right, the last segment's x coordinate is increased by a
 predefined value 'diff' than its second to last segment. And if it's going up
 or down, the segment's y coordinate is affected.
*/
/* function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case 'right':
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

function updateHandContainer() {
  // set all arrows to white
  leftArrow.className = 'left-arrow';
  upArrow.className = 'up-arrow';
  rightArrow.className = 'right-arrow';
  downArrow.className = 'down-arrow';

  switch (direction) {
    case 'right':
      rightArrow.className += ' active-right';
      break;
    case 'up':
      upArrow.className += ' active-up';
      break;
    case 'left':
      leftArrow.className += ' active-left';
      break;
    case 'down':
      downArrow.className += ' active-down';
      break;
  }
} */

/*
 I always check the snake's head position xCor[xCor.length - 1] and
 yCor[yCor.length - 1] to see if it touches the game's boundaries
 or if the snake hits itself.
*/
/* function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop();
    const scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Game ended! Your score was : ' + scoreVal);
  }
} */

/*
 If the snake hits itself, that means the snake head's (x,y) coordinate
 has to be the same as one of its own segment's (x,y) coordinate.
*/
/* function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}
 */
/*
 Whenever the snake consumes a fruit, I increment the number of segments,
 and just insert the tail segment again at the start of the array (basically
 I add the last segment again at the tail, thereby extending the tail)
*/
/* function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    updateFruitCoordinates();
  }
}
 */
//function updateFruitCoordinates() {
  /*
    The complex math logic is because I wanted the point to lie
    in between 100 and width-100, and be rounded off to the nearest
    number divisible by 10, since I move the snake in multiples of 10.
  */

/*   xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
} */

/* function sendWristCommand(command) {
  switch (command) {
    case 74:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 76:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 73:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 75:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
  console.log(direction);
} */
