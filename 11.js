// 数据库的基本操作

// 引入express插件
var express = require("express")


// 引用数据库
var MongoClient = require("mongodb").MongoClient

var app = express()

// 数据库连接地址
var adress = 'mongodb://127.0.0.1:27017/user'

app.get("/", function(req, res) {
    MongoClient.connect(adress, function(err, db) {
        if (err) {
            res.send("数据库连接失败")
            return
        }

        res.write("数据库连接成功")
        var dbo = db.db("test");
        dbo.collection("student").insertOne({ "name": "jackwang" }, function(err, result) {
            if (err) {
                res.send("数据库写入失败")
                return
            }
            res.write("数据库写入成功")
            res.end()

            // 关闭数据库
            db.close()
        })

    })
})


app.listen(3000)