// 用数据库实现一个商品管理系统
var express = require("express")

var MongoClient = require("mongodb").MongoClient

var app = express()


app.set("view engine", "ejs")

// 数据库连接地址
var adress = 'mongodb://127.0.0.1:27017/user'

// 连接数据库并且查询出对应的结果
app.get("/", function(req, res) {
    MongoClient.connect(adress, function(err, db) {
        var dbo = db.db("user");
        if (err) {
            return;
        }

        console.log("数据库连接成功")
        var result = []
        var cursor = dbo.collection('goods').find()
        cursor.each(function(err, doc) {
            if (err) {
                return
            }

            if (doc != null) {
                result.push(doc)
            } else {
                res.render("index", {
                    "result": result
                })
            }
        })
    })
})


// 提交页面路由分配
app.get("/add", function(req, res) {
    res.render("add")
})


// 数据库的写入操作
app.get("/tijiao", function(req, res) {
    // 得到前端传过来的参数
    var goodsName = req.query.goodsName;
    var goodsPrice = req.query.goodsPrice;
    var goodsNewprice = req.query.goodsNewprice;
    var goodsIntro = req.query.goodsIntro

    // 连接数据库
    MongoClient.connect(adress, (err, db) => {
        var odb = db.db("user")
        if (err) {
            console.log("数据库连接失败")
            return;
        }

        odb.collection("goods").insertOne({
            "goodsName": goodsName,
            "goodsPrice": goodsPrice,
            "goodsNewprice": goodsNewprice,
            "goodsIntro": goodsIntro
        }, function(err, result) {
            if (err) {
                console.log("数据库写入失败")
                return
            }

            res.send("写入数据库成功")
            res.end()
                //关闭数据库
            db.close();
        })

    })
})

app.listen(3000)