// chatroom
var express = require("express")
var app = express()

// 使用session
var session = require("express-session")

// session配置
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// express开放的接口
var http = require("http").Server(app)
var io = require('socket.io')(http)

app.set("view engine", "ejs")

var alluser = []

app.get("/", function(req, res, next) {
    res.render("login");
})

app.get("/check", function(req, res, next) {
    // 确认登陆,检查此人是否有用户名，并且昵称不能重复
    // 如果没有用户名的情况
    var username = req.query.username
    if (!username) {
        res.send("请填写用户名")
        return;
    }

    // 用户名已经存在的情况
    if (alluser.indexOf(username) != -1) {
        res.send("用户名已经被占用")
        return;
    }

    alluser.push(username)

    // 存入session
    req.session.username = username
    res.redirect("/chat")
})


app.get("/chat", function(req, res, next) {
    if (!req.session.username) {
        res.redirect("/")
        return;
    }
    res.render("chat", {
        "username": req.session.username
    })
})

io.on("connection", function(socket) {
    // 服务器先要拿到信息，然后再直接返回回去
    socket.on("test", function(msg) {
        io.emit("huida", msg)
    })
})




http.listen(3000)