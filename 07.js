// 使用require来实现一个路由功能
var http = require("http")
var router = require("./router.js")

// 创建服务器
var server = http.createServer((req, res) => {
    if (req.url == "/") {
        router.showIndex(req, res)
    } else if (req.url.substr(0, 9) == "/student/") {
        router.showstudent(req, res)
    } else {
        router.show404(req, res)
    }

}).listen(3000, "127.0.0.1")