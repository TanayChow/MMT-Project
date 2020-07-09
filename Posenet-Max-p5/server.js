/* SERVER CODE - Started from MAX patcher in via [node.script] object */
var express = require("express");
var app = express();
var server = app.listen(3000);
var socket = require("socket.io");
var osc = require('osc-min')
var dgram = require('dgram')
var remoteIp = '127.0.0.1'
var remotePort = 6448
var udpServer = dgram.createSocket('udp4')
const maxAPI = require("max-api");
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("New connection @ socket - " , socket.id);

    socket.on('pose', poseData);
    socket.on('synth', synthData);
    socket.on('balance', balanceData);

    /* send data to MAX via max-api 
        Also send data to wekinator */
    function poseData(data) {
        var poseData = JSON.parse(data);
        maxAPI.outlet(poseData);

        /* Create args for OSC message */
        var args = [];
        console.log(poseData.keypoints[0].position);
        for(var i =0; i < poseData.keypoints.length; i++) {
            args.push({
                type: 'float',
                value: poseData.keypoints[i].position.x || 0
              })
            args.push({
                type: 'float',
                value: poseData.keypoints[i].position.y || 0
              })
        }
        
        
        var oscMsg = osc.toBuffer({
          oscType: 'message',
          address: '/wek/inputs',
          args: args
        })
        /* Send OSC messages to Wekinator listening at port 6448 at local IP*/
        udpServer.send(oscMsg, 0, oscMsg.length, remotePort, remoteIp)
        console.log('OSC message sent to ' + remoteIp + ':' + remotePort)
    }

    function synthData(data1, data2, data3) {
        maxAPI.outlet(['synth1' , data1, 'synth2', data2, 'synth3', data3]);
    }

    function balanceData(data) {
        var balanceData = JSON.parse(data);
        maxAPI.outlet(balanceData);
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