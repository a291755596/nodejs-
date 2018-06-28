var express = require("express")
var https = require('https');
var qs = require('querystring');
var formidable = require("formidable")

var app = express()


// 使用ejs模板
app.set("view engine", "ejs")

// 设置静态资源管理器
app.use(express.static("./public"))

app.get("/", function(req, res, next) {
    res.render("send")
})

app.post("/sendmessage", function(req, res, next) {
    var msg = ''
    var num = random()
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        var apikey = '65fa867d9ab62dffc44a10f2ed6073d1';
        var mobile = fields.tel;
        var send_sms_uri = '/v2/sms/single_send.json';
        var text = '【王刚G】您的验证码是' + num + '。如非本人操作，请忽略本短信';
        send_sms(send_sms_uri, apikey, mobile, text, function(data) {
            res.json(data)
        });
    })
})

// 调用发送短信验证码的接口
function send_sms(uri, apikey, mobile, text, fn) {
    var sms_host = 'sms.yunpian.com';
    var post_data = {
        'apikey': apikey,
        'mobile': mobile,
        'text': text,
    }; //这是需要提交的数据  
    var content = qs.stringify(post_data);
    post(uri, content, sms_host, function(data) {
        fn != undefined && fn(data);
    });
}


// 向一个安全的服务器发送请求，并且请求数据
function post(uri, content, host, fn) {
    let data = '';
    var options = {
        hostname: host,
        port: 443,
        path: uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var req = https.request(options, function(resq) {
        var _msg = ''
        resq.setEncoding('utf8');
        resq.on('data', function(chunk) {
            _msg += chunk;
        });

        resq.on('end', function() {
            fn != undefined && fn(_msg);
        });
    });

    req.write(content);
    req.end();
}


function random() {
    var Num = ""
    for (let i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10)
    }
    return Num;
}


app.listen(3080, "127.0.0.1")