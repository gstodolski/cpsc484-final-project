# cpsc484-final-project

TODO: Indicate on recommendation page that the user can leave the page by raising their hands.

# TODO: How to Run
TODO: explain how to install any dependencies and run the project (2 pts)

# Description and Tasks

## Overview

The display revolves around a Buzzfeed-style quiz, like a personality quiz. The users answer questions about their personalities and what they are looking for in a campus community/organization and receive feedback on organizations they should join. First, the user must walk up to the screen to indicate that they would like to participate in the activity.  When they approach the screen, we take in the body tracking data and run a calibration using the tracking data to ensure they are in a good position to complete the quiz. Then, they indicate their answers to the provided questions by moving to either the left or right hand of the screen (where different answer choices in the Trivia Manager are available to reveal their personality/preferences). At the end, based on their answers (which are tracked), a recommendation is provided of an organization that matches their preferences as well as a description of the organization and a QR code which links to the website of the recommended organization. Once they indicate they have read the description and collected the information they need by raising their hands or the timer on their recommendation display has concluded, they are thanked for their time and the display is now ready for another user to interact with.

## Tasks:
01. The user is able to answer questions about their personality, so the display can provide the best possible community recommendations to the user, rather than generic information they can find elsewhere.
02. The user is able to record information of how to get involved in these organizations and indicate when they have concluded collecting the information the display has provided.

# TODO: Deployment Environment Constraints
TODO: indicates explicitly if there are any constraints from the deployment environment (0.5 pts)
the text file should explain any physical constraints that are important to consider when the course staff evaluates the system prototype. For instance, would users need to be able to stand at least a minimum distance away from the Kinect for the application to run as intended?

# TODO: Collaboration record 
## Julie Fan: jyf6

## Graham Stodolski: gts27
I took on handling the Kinect data and body tracking parts of this assignment. This encompasses a lot of the sketch.js file, where the data is captured and processed using multiple different functions and helpers that I'm responsible for (to locate where the pelvis is, to use that information to send a command, to detect if the person's hands are raised which indicates that they want to quit, to detect the closest person to the sensor). I also wrote the timer javascript that's present throughout a lot of the display and advances users through the system. Lastly, I was very active in testing the display in person, debugging the entire project, and assisting my teammates whenever needed. Other contributions can be seen in the Github repo [here](https://github.com/gstodolski/cpsc484-final-project).

## Charlotte Long: cmb296

## Sem Asmelash: sma83
