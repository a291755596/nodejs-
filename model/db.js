// mongodb使用DAO层封装，主要是封装数据库中常用的函数


// 首先是连接数据库

// 创建数据库对象
var MongoClient = require("mongodb").MongoClient

// 封装连接数据库的函数,只要一使用到数据库，就直接连接
// 一调用_connect的函数，就会有一个回调函数，可以在等逻辑完成后进行回调
// 连接数据库不向外部暴露
function _connect(callback) {
    var url = "mongodb://localhost:27017"

    MongoClient.connect(url, function(err, db) {
        if (err) {
            // 如果发生错误，回调函数会把err放进去
            callback(err, null)
            return
        }

        // 如果没有错误，回调函数会把错误和连接后返回的对象拿到
        callback(err, db)
    })
}


// 封装插入的方法

// 插入方法需要三个参数，集合名称，插入的内容，和回调函数
exports.insert = function(dbname, collectionName, json, callback) {
    // 首先调用连接数据库的方法,并且传入回调函数
    _connect(function(err, db) {
        var odb = db.db(dbname)
            // 找到数据库，并选择插入哪一个集合
        odb.collection(collectionName).insertOne(json, function(err, result) {
            callback(err, result)
            db.close() //关闭数据库
        })
    })
}


// 封装查找方法
exports.find = function(dbname, collectionName, json, C, D) {
    var result = []

    // 由于查找方法传入的数据比较多，可以根据参数来进行判断
    // 如果三个参数的时候，就说明C的参数就是回调函数,参数D没有传。
    // 排序和分页都不传
    if (arguments.length == 4) {
        var callback = C;

        // 分页使用0来表示，就说明查找全部内容
        var skipnumber = 0;
        var limit = 0;

    } else if (arguments.length == 5) {
        // 如果是4个参数的情况
        var callback = D;

        // 这里的args应该是包含了排序，分页的一个对象
        var args = C;

        // pageamount是一页显示多少条内容
        // page是多少页数据，这是一个不固定的参数
        // 在mongodb中分页需要两个函数 一个是skip跳多少个参数，另一个是limit限制多少条数据
        // 在mongodb中的sort函数可以根据字段，传入-1和1的参数，表示正序或者倒叙
        var skipnumber = args.pageamount * args.page || 0;
        var limit = args.pageamount || 0;
        var sort = args.sort || {}
    } else {
        throw new Error("传入参数不正确")
        return;
    }


    // 判断完成后连接数据库
    // 调用连接数据库的内部函数
    _connect(function(err, db) {
        var odb = db.db(dbname)
        var cursor = odb.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort)
        cursor.each(function(err, doc) {
            if (err) {
                callback(err, null)
                db.close() //关闭数据库
                return;
            }

            if (doc != null) {
                result.push(doc)
            } else {
                callback(null, result)
                db.close()
            }
        })
    })
}


// 封装删除方法
exports.deleteData = function(dbname, collectionName, json, callback) {
    _connect(function(err, db) {
        odb = db.db(dbname)

        // 传一个参数，选择删除哪个字段
        odb.collection(collectionName).deleteMany(json, function(err, result) {
            callback(err, result)
            db.close()
        })
    })
}



// 封装修改方法
exports.updateMany = function(dbname, collectionName, json1, json2, callback) {
    _connect(function(err, db) {
        odb = db.db(dbname)

        odb.collection(collectionName).updateMany(json1, json2, function(err, results) {
            callback(err, results)
            db.close()
        })
    })
}


// 封装获取总数的方法
exports.getAllcount = function(dbname, collectionName, callback) {
    _connect(function(err, db) {
        odb = db.db(dbname)
        odb.collection(collectionName).count({}).then(function(count) {
            callback(count)
            db.close()
        })
    })
}