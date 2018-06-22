// cookie的猜你喜欢
var express = require("express")
var cookie = require("cookie-parser")

var app = express()

// 使用cookie就需要引入一个parser的包，并且在页面中引用
app.use(cookie())


app.get("/", function(req, res) {
    // 拿到cookie,然后拼接到页面上去
    res.send("猜你喜欢" + req.cookies.mudidi)
})


// 用户在查询某个地方的旅游攻略的时候，使用cookie来记录下查询的是哪个地方，然后添加到cookie中
app.get("/gonglue", function(req, res) {
    var mudidi = req.query.mudidi

    // 读取cookie，如果cookie中有值,就走前面一步，如果没有值就为空数组
    var mudidiarray = req.cookies.mudidi || [];

    // 把数据push到mudidiarray的数组中
    mudidiarray.push(mudidi);

    // 设置cookie，第一个参数是名称，第二个参数是要存入的数据，第三个参数是过期时间，
    // 第四个参数是在cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击
    res.cookie("mudidi", mudidiarray, { maxAge: 900000, httpOnly: true })
    res.send(mudidi + "旅游攻略")
})

app.listen(3000)