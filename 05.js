//获取一个文件夹中的文件夹名
// 不能使用for循环，因为readdir是异步的，这样会导致循环出来的文件名位同一个

var http = require("http")
var fs = require("fs")


var server = http.createServer(function(req, res) {
    if (req.url == "/favicon.ico") {
        return;
    }

    // 遍历test中的所有的文件夹和文件
    // readdir是读取文件夹中所有的文件，并且回调函数会返回一个files数组
    // 使用自执行函数来对文件夹进行循环，此处不能使用for循环
    fs.readdir("./album/", function(err, files) {
        // files是一个存放文件名的数组
        var wenjianjia = [];

        // 使用自执行函数来解决异步的问题
        (function iterator(i) {
            // 如果数组的长度等于i的值，就停止循环
            if (i == files.length) {
                console.log(wenjianjia)
                return;
            }

            // 检测一下文件夹的类型，如果符合类型就添加到wenjianjia这个数组里面去
            fs.stat("./album/" + files[i], function(err, stats) {
                // 判断一下是否符合类型
                if (stats.isDirectory()) {
                    // 如果是文件夹就放入数组
                    wenjianjia.push(files[i])
                }

                iterator(i + 1)
            })
        })(0);
    })

    res.end();
})

server.listen(4000, "127.0.0.1")