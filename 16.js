// session实现用户的登陆,参照localstroage原理
var express = require("express")
var app = express()
var db = require("./model/db.js")
var session = require("express-session")

// session的配置项
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static("./public"))
app.set("view engine", "ejs")

app.get("/", function(req, res, next) {
    if (req.session.login == "1") {
        res.send("欢迎" + req.session.username)
    } else {
        res.send("没有登陆成功")
    }
})


app.get("/login", function(req, res, next) {
    res.render("sessionlogin")
})

app.get("/register", function(req, res, next) {
    res.render("sessionregister")
})

app.get("/reg", function(req, res, next) {
    var username = req.query.username
    var password = req.query.password
    db.find("user", "user", { "username": username }, function(err, result) {
        if (result.length != 0) {
            res.send("用户名已经存在")
            return;
        } else {
            db.insert("user", "user", { "username": req.query.username, "password": req.query.password }, function(err, result) {
                if (err) {
                    res.send({ "result": -1 })
                } else {
                    res.send({ "result": 1 })
                }
            })
        }
    })
})



app.get("/checklogin", function(req, res, next) {
    // 获取到get带过来的参数，post可以使用formidable来获取到参数
    var username = req.query.username
    var password = req.query.password

    db.find("user", "user", { "username": username }, function(err, result) {
        if (result.length == 0) {
            res.send("用户名错误")
            return;
        }
        var dbpassword = result[0].password
        if (dbpassword == password) {
            req.session.login = "1";
            req.session.username = result[0].username
            res.send("登陆成功" + result[0].username)
        } else {
            res.send("密码错误")
        }
    })
})

app.listen(3000)