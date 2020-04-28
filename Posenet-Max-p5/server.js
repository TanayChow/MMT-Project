var express = require("express");
var app = express();
var server = app.listen(3000);
var socket = require("socket.io");
const maxAPI = require("max-api");
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("New connection @ socket - " , socket.id);

    //socket.on('mouse', mouseMessage);
    socket.on('pose', poseData);
    function mouseMessage(data) {
        console.log("mouseData - ", data.x, data.y,data.mouseIsPressed);
       // socket.broadcast.emit('mouse', data);
    }

    function poseData(data) {
        maxAPI.outlet(JSON.parse(data));
    }

}

app.use(express.static('public'));
console.log("Server is running");