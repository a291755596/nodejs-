// 表单提交上传图片，配合formidable插件一起使用,并且修改图片名称(时间+随机数的形式)
var http = require("http")
    // 引入一个表单上传图片的包
var formidable = require('formidable')
    // 引入一个处理时间格式的插件
var sd = require("silly-datetime")
    // 引入系统的fs模块
var fs = require("fs")
var util = require('util');
var path = require("path")

var server = http.createServer((req, res) => {
    // 1、首先判断是否是post请求或者是否访问的是某个地址
    if (req.url == "/dopost" && req.method.toLowerCase() == "post") {
        // 2、新建一个即将到来的表单
        var form = new formidable.IncomingForm()

        // 3、设置上传图片的文件存储路径
        form.uploadDir = './uploads'

        // 4、执行表单接收命令(接收三个参数，1、错误有限原则，2、所有的数据都在fields中展现，3、所有的文件都在files中展现)
        form.parse(req, function(err, fields, files) {
            console.log("++++++", files)
                // 5、处理error数据
                // if (err) {
                //     throw err
                // }
                // 6、改名，首先拿到需要的数据，时间和随机数
                // 拿到时间就需要用另一个插件
            var time = sd.format(new Date(), 'YYYYMMDDHHmmss')
                // 拿到一个随机数
            var random = parseInt(Math.random() * 8999 + 10000)
                // 根据后缀名来给修改完成后的图片命名

            var extname = path.extname(files.tupian.name)

            // 执行修改名称，需要三个参数，old new和回调函数
            var oldpath = __dirname + '/' + files.tupian.path
            var newpath = __dirname + "/uploads/" + time + random + extname

            // 执行rename函数来修改文件名
            fs.rename(oldpath, newpath, (err) => {
                if (err) {
                    throw err;
                }

                // 并且往前端返回
                res.writeHead(200, { 'content-type': 'text/plain' })
                res.end("success")
            })
        })

    } else if (req.url == "/") {
        // 如果不是post或者post方法，默认页面就是上传图片的页面，读取文件，然后展示出来
        fs.readFile("./file.html", (err, data) => {
            res.writeHead(200, { 'content-type': 'text/html' })
            res.end(data)
        })
    } else {
        // 如果两个都不是，就直接返回404页面
        res.writeHead(404, { 'content-type': 'text/html' });
        res.end("404");
    }
}).listen(80, "127.0.0.1")