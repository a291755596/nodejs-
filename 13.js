// 测试dao封装的数据库
var express = require("express")

var app = express()

// 引入自己封装的数据库
var db = require("./model/db.js")


// 插入数据库，使用dao封装的insert方法
app.get("/", function(req, res) {
    // 调用函数，传入四个参数，数据库名称，集合，插入什么，插入完成后干什么
    db.insert("user", "goods", {
        "goodsName": "iphone6ss",
        "goodsPrice": 6888,
        "goodsNewprice": 1288,
        "goodsIntro": "这是iphone6sdao插入",
        "goodsWeight": 35
    }, function(err, result) {
        if (err) {
            cconsole.log("插入失败")
            return
        }

        res.end("插入成功")
    })
})


// 查找数据库中的内容，并排序
app.get("/find", function(req, res) {
    var page = parseInt(req.query.page)
    console.log("page", page)
        // 在哪个集合查，查什么，分页设置+排序，查完之后做什么
        // goods集合查，查所有的东西,第三个参数可以不传，做过参数判断，直接回调
        // 从0开始？？
    db.find("user", "goods", {}, { "sort": { "goodsNewprice": 1 }, "pageamount": 5, "page": page + 1 }, function(err, result) {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})

app.get("/delete", function(req, res) {
    var goodsPrice = req.query.goodsPrice
        //四个参数,哪个数据库，哪个集合，删除哪个字段，回调函数
    db.deleteData("user", "goods", { "goodsPrice": goodsPrice }, function(err, result) {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})


app.get("/update", function(req, res) {
    db.updateMany("user", "goods", { "goodsPrice": 6488 }, { $set: { "goodsPrice": 1111 } }, function(err, result) {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.get("/count", function(req, res) {
    db.getAllcount("user", "goods", function(counts) {
        console.log("____", counts)

        // res.write(counts.toString())
    })
})



app.listen(3000)