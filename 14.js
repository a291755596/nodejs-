// 使用express实现一个留言本的功能

var express = require("express")
var app = express()

// 引入封装的数据库
var db = require("./model/db.js")

var formidable = require("formidable")
var ObjectId = require('mongodb').ObjectID;

app.set("view engine", "ejs")

app.use(express.static("./public"))


// 页面加载的时候就获取留言条数
app.get("/", function(req, res) {
    db.getAllcount("message", "msgs", function(count) {
        console.log(count)
        res.render("message", {
            // 一页5跳，总数除以页数就能获得多少个数字
            "pageamount": Math.ceil(count / 5)
        })
    })

})


// 读取所有的留言
app.get("/read", function(req, res) {
    // 可以获取到page带过来的参数，然后去数据库查询
    var page = parseInt(req.query.page)

    db.find("message", "msgs", {}, { "sort": { "tiem": -1 }, "pageamount": 5, "page": page }, function(err, result) {
        // 把读取到的结果通过json返回出去
        res.json({ "result": result })
    })
})


// 提交留言
app.post("/send", function(req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields) {
        console.log(fields)
        db.insert("message", "msgs", {
            "name": fields.name,
            "cont": fields.cont,
            "tiem": new Date()
        }, function(err, result) {
            if (err) {
                res.send({ "result": -1 })
                return
            }
            res.json({ "result": 1 })
        })
    })
})

// 删除留言,删除留言一般使用数据库自带的id来进行删除
// 如果要使用id就必须引入一个插件
app.get("/delete", function(req, res) {
    var id = req.query.id
    db.deleteData("message", "msgs", { "_id": ObjectId(id) }, function(err, result) {
        // 删除完成后重新定向
        res.redirect("/")
    })
})



app.listen(3000)