// websocket
var http = require("http")
var fs = require("fs");

var server = http.createServer(function(req, res) {
    if (req.url == "/") {
        fs.readFile("./paint.html", function(err, data) {
            res.end(data)
        })
    }
})


// 这条语句相当于
// var socket = require('socket.io')
// var io = socket(server)
var io = require('socket.io')(server)

io.on("connection", function(socket) {
    // 服务器先要拿到信息，然后再直接返回回去
    socket.on("hua", function(msg) {
        io.emit("huida", msg)
    })
})


server.listen(3000, '192.168.1.11');