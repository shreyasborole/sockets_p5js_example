const express = require('express');
const app = express();
const server = app.listen(3000);

app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

io.on('connection', newConnection);

function newConnection(socket){
    console.log('New connection: ' + socket.id);
    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse', data);
    }
}