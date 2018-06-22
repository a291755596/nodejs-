// url模块
var http = require("http")
var url = require("url")

var server = http.createServer(function(req, res) {
    // url.hash 获取浏览器地址#号后面的内容
    // url.host 获取主机名地址，含端口号
    // url.hostname 获取主机名地址，不含端口号
    // url.href 获取序列化的地址    https://example.org/foo
    // url.origin 获取只读序列化的URL origin部分    输出 https://example.org
    // url.pathname 获取及设置URL的路径(path)部分   https://example.org/abc/xyz?123 ==>/abc/xyz
    // url.port 获取主机名端口号    https://example.org:8888 ==>8888
    // url.protocol 获取主机名协议  http或者https
    // url.search URL的序列化查询(query)部分    https://example.org/abc?123 ==>?123

    // url.parse(req.url，true).query,parse可以传两个参数，一个是true，把query序列化成数组
    var pathname = url.parse(req.url).pathname
    console.log(pathname)
    res.end()
})


server.listen(4000, "127.0.0.1")