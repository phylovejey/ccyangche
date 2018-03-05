var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/maixiandb';
var maixiandb = {};

maixiandb.connectdb = function(callback){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
        if(err){
            console.log("连接失败！");
        }else{
            console.log("连接成功！"); 
            maixiandb.db = db;
            callback();
        }
	});
}

module.exports = maixiandb;