var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/maixiandb';
var maixiandb = {};

maixiandb.connectdb = function(){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	  if(err)
	  {
	    console.log("连接失败！");
	  }
	  else
	  {
	    console.log("连接成功！"); 
	    maixiandb.db = db;
	  }
	});
}

maixiandb.findData = function(){

};

maixiandb.insertData = function(table, data, callback) {
	console.log("data ", data); 
	console.log("table ", table); 
    var collection = maixiandb.db.collection(table);
	console.log("collection ", collection); 

    //插入数据
    collection.insert(data, function(err, result) { 
        if(err)
        {
	    	callback({status:0,
	    				info:err.tostring()});
            //console.log('Error:'+ err);
            return;
        }
	    callback({status:1});
    });
};

module.exports = maixiandb;