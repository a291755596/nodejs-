// 文件系统,读取文件，readFile
var http = require("http")
var fs = require("fs")

// var server = http.createServer(function(req, res) {
//     if (req.url == "/favicon.icon") {
//         return;
//     }

//     res.writeHead(200, { "Content-type": "text/html; charset=utf8" })
//     fs.readFile("./test/1.txt", function(err, data) {
//         if (err) {
//             throw err;
//         }

//         res.end(data)
//     })
// })


// server.listen(4000, "127.0.0.1")


// 文件系统新建文件夹
// var server = http.createServer(function(req, res) {
//     if (req.url == "/favicon.icon") {
//         return;
//     }

//     fs.mkdir("./test/aaa")

//     res.end()

// })

// server.listen(4000, "127.0.0.1")


// 文件系统检测文件的状态 是文件还是文件夹？
var server = http.createServer(function(req, res) {
    if (req.url == "/favicon.icon") {
        return;
    }

    fs.stat('./test/aaa', function(err, data) {
        console.log(data.isDirectory()) //返回true 判断该文件是不是文件夹
            // console.log(data.isFile()) 该文件是不是一个普通的文件
    })



})

server.listen(4000, "127.0.0.1")