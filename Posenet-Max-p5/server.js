/* SERVER CODE - Started from MAX patcher in via [node.script] object */
var express = require("express");
var app = express();
var server = app.listen(3000);
var socket = require("socket.io");
const maxAPI = require("max-api");
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("New connection @ socket - " , socket.id);

    socket.on('pose', poseData);
    socket.on('synth', synthData);

    /* send data to MAX via max-api */
    function poseData(data) {
        maxAPI.outlet(JSON.parse(data));
    }

    function synthData(data) {
        maxAPI.outlet(data);
    }

    // Recieve messages from MAX via max-api
    maxAPI.addHandler("send1", (...args) => {
        console.log(args);
        socket.emit('counter', {
            address: "/max/midi",
            args: [
                {
                    type: "i",
                    value: args[0]
                }
            ]
        });
    });

}

app.use(express.static('public'));
console.log("Server is running");