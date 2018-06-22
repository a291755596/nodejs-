//前端post提交和数据处理
var http = require("http")

//处理字符串的方法
var querystring = require("querystring")


// 创建服务器
var server = http.createServer((req, res) => {
    // 如果你的访问地址是/post,并且请求类型是post请求
    if (req.url == "/dopost" && req.method.toLowerCase() == "post") {
        var alldata = "";

        // post的请求是分为发送部分和发送结束部分，通过监听发送部分来接收数据
        // post请求发送过来的数据是一种chunk的模式，一小段一小段接收的
        // 监听发送时候的数据
        req.addListener("data", (chunk) => {
            alldata += chunk
        })

        req.addListener("end", () => {
            var datastring = alldata.toString()

            // 将datastring转化成一个对象，使用到querystring的方法
            var dataobj = querystring.parse(datastring)
            console.log(dataobj)
            console.log(dataobj.name)
            console.log(dataobj.age)

            res.writeHead(200, { "content-type": "text/plain; charset=utf8" })
            res.end("success")
        })
    }


}).listen(3000, "127.0.0.1")