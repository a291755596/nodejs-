// express

// 【1】通过npm安装express，并且引入express
var express = require("express")
var bodyParser = require("body-parser")

var app = express()

// 【2】express设置静态资源管理器,使用use中间件
// 设置完静态资源管理器就可以设置一个文件夹为根目录
app.use(express.static("./public"))


// 【3】express使用ejs模板,可以不用引包,但是必须得有这个包
app.set("view engine", "ejs")


// 【4】当路由访问任何路径的时候返回
app.get("/", function(req, res) {
    // res.send可以返回一个views文件夹中的ejs模板
    res.send("这是一个测试文件")
})

// 通过地址栏上面的地址来进行路由转发   http://localhost:3000/test
app.get("/test", function(req, res) {
    res.send("这是一个路由转发页面")
})

// 【5】通过get传参过来的参数,可以通过req.params来拿到
app.get("/student/:id", (req, res) => {
    // http://localhost:3000/student/5
    res.send("这是一个id，id号为" + req.params.id)
})


// 【6】ejs的简单使用
app.get("/ejs", function(req, res) {
    res.render("test", {
        "news": ["这是新闻1", "这是新闻2", "这是新闻3"]
    })
})



// 【7】中间件next的使用，获取到get到的参数，然后对比数据库，如果能对比到,就直接send数据
// 如果匹配不到数据，那么就可以执行下一步
app.get("/:username/:id", function(req, res, next) {
    var username = req.params.username;
    if (检索数据库) {
        // 如果检索到数据库
        res.send("1")
    } else {
        next() //可以执行下一步
    }
})


app.get("/admin/login", function(req, res) {
    res.send("管理员登陆")
})


// 【8】express的post的使用
// post需要使用一个插件body-parser

//bodyParser API
// 直接使用use来引入中间件
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/testpost", function(req, res) {
    res.render("post")
})

app.post("/dopost", function(req, res) {
    // 获取到用户访问的ip的地址
    console.log(req.ip)

    // 获取到post提交上来的数据
    console.log(req.body)
    res.send("success")
})


// 通过listen方法来监听3000端口
app.listen(3000)