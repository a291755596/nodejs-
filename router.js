exports.showIndex = showIndex;
exports.showstudent = showstudent;
exports.show404 = show404;

function showIndex(req, res) {
    res.writeHead(200, { "Content-type": "text/html;charset=utf8" })
    res.end("我是首页")
}


function showstudent(req, res) {
    var id = req.url.substr(9, 6)
    res.writeHead(200, { "Content-type": "text/html;charset=utf8" })
    res.end("我是学生页面" + id)
}

function show404(req, res) {
    res.writeHead(200, { "Content-type": "text/html;charset=utf8" })
    res.end("404")
}