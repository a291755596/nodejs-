// 实现一个hello world

// 引入一个http的包
var http = require('http')

// 创建服务器，参数是一个回调函数
var server = http.createServer(function(req, res) {
    // req表示请求，res表示返回的数据
    // 设置HTTP头部，状态码是200，文件类型是html，字符集是utf8
    res.writeHead(200, { "Content-type": "text/html;chartset=utf-8" })

    // 必须需要一个res.end,要不会一直加载
    res.end("hello world")
})


// 运行服务器，监听一个端口
server.listen(4000, "127.0.0.1")