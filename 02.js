// req和res
var http = require("http")

var server = http.createServer(function(req, res) {
    console.log(req.url)
    res.writeHead(200, { "Content-type": "text/html; charset=utf8" })
    res.write("<h1>这是一个标题</h1>")
    res.end()
})


server.listen(4000, "127.0.0.1")