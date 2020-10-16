# Music and Media Technologies - Thesis Project
B-Audio
An interactive interface designed for contactless full-body interaction with audio and video in a web browser. More details about this project can be found at 
[MMT Website](https://www.mmtshow.com/projects/Tanay-Chowdhury)

Embodied design methodologies are applied to conceptualize and develop a system for live audio-visual interaction. 

# Setup and Launch
Please follow the below steps to setup the application environment and run the application
1) Pull the repo
2) In the /MMT-Project/Posenet-Max-p5 folder open a terminal window and run 'npm install' command (note : Node must be installed prior to this step). This will install all the dependencies related to the project. 
3) Open the MAX patch in MAX v8 and in the presentation view click on the 'script start' button. This will start the server script and the error logs will be shown in the patcher. 
4) Click on the 'Start' button to launch the browser window. (Note : Permissions for camera access and microphone access need to be provided at this stage)

# Posenet
Javascript based libraries were used to enable pose detection in the browser and implement graphics functionality

# Express
An express server was used to communicate with the webpage and send data to MAX-MSP audio synthesis software. Socket.io was used for client-server communications.

# Node for MAX
Nodejs and MAX were connected using Node for MAX

# Poster
A poster which presents the abstract and concise description of the methodology and findings of the project.
![Project Poster](https://github.com/TanayChow/MMT-Project/blob/master/stream_poster_revised-Tanay_Chowdhury%20(1).jpg?raw=true)

# Demo 
This [video presentation](https://youtu.be/ZdYopVIa_oE) shows an overview of the design and demonstration of the system

