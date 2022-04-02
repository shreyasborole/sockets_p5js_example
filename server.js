const http = require('http')
const express = require('express')

const port = 3000;

const app = express()
app.use(express.static('public'))

app.set('port', `${port}`)

const server = http.createServer(app)
server.on('listening', () => {
    console.log(`Listening on: http://localhost:${port}`)
})

server.listen('3000')

const io = require('socket.io')(server)
io.sockets.on('connection', (socket) => {
    console.log(`Client connected id(${socket.id})`);
    socket.on('mouse', (data) => socket.broadcast.emit('mouse', data));
    socket.on('disconnect', () => console.log(`Client disconnected id(${socket.id})`))
});