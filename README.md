# cpsc484-final-project

# How to Run
There are no extra dependencies to be installed in order to run our trivia game. Simply upload the zip and begin playing!

# Description and Tasks

## Overview

The display revolves around a Buzzfeed-style quiz, like a personality quiz. The users answer questions about their personalities and what they are looking for in a campus community/organization and receive feedback on organizations they should join. First, the user must walk up to the screen to indicate that they would like to participate in the activity.  When they approach the screen, we take in the body tracking data and run a calibration using the tracking data to ensure they are in a good position to complete the quiz. Then, they indicate their answers to the provided questions by moving to either the left or right hand of the screen (where different answer choices in the Trivia Manager are available to reveal their personality/preferences). At the end, based on their answers (which are tracked), a recommendation is provided of an organization that matches their preferences as well as a description of the organization and a QR code which links to the website of the recommended organization. Once they indicate they have read the description and collected the information they need by raising their hands or the timer on their recommendation display has concluded, they are thanked for their time and the display is now ready for another user to interact with.

## Tasks addressed:
01. The user is able to answer questions about their personality, so the display can provide the best possible community recommendations to the user, rather than generic information they can find elsewhere.
02. The user is able to record information of how to get involved in these organizations and indicate when they have concluded collecting the information the display has provided.

# Deployment Environment Constraints
The user should be within about a 6 feet radius of the kinect sensor. The user should also stand at least 2 feet away from the Kinect sensor for the application to run properly. Also when trying to quit the program, users need to have both hands above their necks. When answering the questions, you know that you are within the correct position limits of the Kinect when the box turns blue. 

# Collaboration record 

## Julie Fan: jyf6
I handled the question logic part of the assignment, as well as styling for the question.html and recommendation.html files. The question logic analyzes the user’s yes/no response and curates a unique set of questions (total of eight sets of questions and 8 different club possibilities, but the user is presented with just 3) for each user that relies on their response to the previous question. I used a binary search tree structure (see our group’s A5 assignment for the diagram) since it made the most sense to treat a yes/no response as traveling down the left/right children nodes of questions (as opposed to presenting 8 questions that each take 15 seconds to answer, recording the number of yes/no responses, and then assigning a certain ratio to each club). I wrote the html, css, and javascript for the aforementioned files and aided in debugging. 

## Graham Stodolski: gts27
I took on handling the Kinect data and body tracking parts of this assignment. This encompasses a lot of the sketch.js file, where the data is captured and processed using multiple different functions and helpers that I'm responsible for (to locate where the pelvis is, to use that information to send a command, to detect if the person's hands are raised which indicates that they want to quit, to detect the closest person to the sensor). I also wrote the timer javascript that's present throughout a lot of the display and advances users through the system. Lastly, I was very active in testing the display in person, debugging the entire project, and assisting my teammates whenever needed. Other contributions can be seen in the Github repo [here](https://github.com/gstodolski/cpsc484-final-project/commits?author=gstodolski).

## Charlotte Long: cmb296
For assignment 5, I wrote the HTML for the introduction, calibration, and instructions slides. So, for this assignment, I integrated the body tracking data with these files (slide.js, index.html, instructions.html). I added the ability to move throught these first few slides using the functions and timer that Graham created. This involved a lot of debugging and trial-and-error to test what would work and create the most seamless experience for the user. Unfortunately, that meant removing the pop-up which was used for the calibration and instead integrating that function with the instructions page. I added functions to enable the final slide to return home upon finishing giving the user results as well as returning to the home page when the user decides not to continue with the game after reading the instructions page. I was able to meet with my group to test the project in person and make adjustments following the testing based on the errors we encountered. 

## Sem Asmelash: sma83
I initially worked on creating the html and css files for the question and recommendation slides. We went through a couple of design iterations before landing on the current version. Within the question slide, I worked on integrating the kinect sensor data by implementing the function that changed the color of the left or right box depending on the user's position. I also helped implement the quit function which responds when the users hands are above their neck. I also worked with my teammates to debug/troubleshoot the entire project, making sure the kinect sensor data was being handled properly, ensuring that the properties of out html and css pages were properly adjusted to the display screen, and testing out the general functionality of the program. 