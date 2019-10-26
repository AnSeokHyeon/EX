var express = require('express')
var socket = require('socket.io')
var http = require('http')
var fs = require('fs')

var ex = express()
var server = http.createServer(ex)
var io = socket(server)

ex.use('/css', express.static('./ex/css'))
ex.use('/js', express.static('./ex/js'))

ex.get('/', function (request, response) {
    fs.readFile('./ex/ex.html', function (err, data) {
        if (err) {
            response.send('err')
        }
        else {
            response.writeHead(200, { 'Content-Typ': 'text/html' })
            response.write(data)
            response.end()
        }
    })
})

io.sockets.on('connection', function (socket) {
    console.log('유저 접속됨')
    socket.on('send', function (data) {
        console.log('전달된 메세지 : ', data.msg)
    })
    socket.on('disconnect', function () {
        console.log('접속 종료')
    })
})

server.listen('8080', function () {
    console.log('구축 완료')
})