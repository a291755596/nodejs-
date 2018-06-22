// 制造一个静态文件目录
var http = require("http")
var url = require("url")
var path = require("path")
var fs = require("fs")

http.createServer(function(req, res) {
    console.log(1)
    if (req.url == "/favicon.ico") {
        return;
    }

    // 通过文件夹名称不同来访问不同的资源文件
    // 首先获取到用户在浏览器地址后面输入的内容，根据内容不同，返回不同的数据
    // 获取到url地址后面不同的内容
    var pathname = url.parse(req.url).pathname

    // 如果地址后面没有输入任何内容，将会输出index.html
    // 判断用户驶入的是文件夹还是文件名，如果是文件名，就需要根据“.”来进行判断
    if (pathname.indexOf(".") == -1) {
        pathname += "/index.html"
    }

    // 获取扩展名,通过path的模块来获取扩展名
    var extname = path.extname(pathname)

    // 解析一下网址，对于多个斜杠进行处理
    var fileUrl = "./" + path.normalize("./static/" + pathname)


    // 获取到不同的地址之后，就读取这个文件
    fs.readFile(fileUrl, function(err, data) {
        // 首先处理报错的情况，如果报错就返回404的页面
        if (err) {
            fs.readFile("./album/404.html", function(err, data) {
                res.writeHead(404, { "Content-type": "text/html;charset=UTF8" });
                res.end(data);
            })
        }

        //其次处理找到的文件
        // 找到的文件根据mime（扩展名）不同，content-type里面的参数也是不一样的，所以就要处理扩展名的问题
        // var mime = getmime(extname)
        // res.writeHead(200, { "Content-type": mime });
        // res.end(data);

        // 使用回调函数的形式，把参数传递进来，一个函数的返回值作为另一个函数的参数
        getmime(extname, (minme) => {
            res.writeHead(200, { "Content-type": mime });
            res.end(data)
        })
    })

}).listen(4000, "127.0.0.1")



// 根据扩展名来判断不同的内容返回的数据
// function getmime(extname) {
//     switch (extname) {
//         case ".jpg":
//             return "image/jpg"
//             break;
//         case ".html":
//             return "text/html"
//             break;
//         default:
//             break;
//     }
// }


// 通过json来判断不同的内容返回的数据
function getmime(extname, callback) {
    fs.readFile('./mime.json', (err, data) => {
        if (err) {
            throw Error("找不到mime文件")
        }

        // 由于是json文件，需要转化为字符串
        var mimeJSON = JSON.parse(data)
        var mime = mimeJSON[extname] || "text/plain"

        callback(mime)
    })


}