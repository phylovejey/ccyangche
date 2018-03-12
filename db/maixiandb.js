var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://mxphy:mxccyangche1234!@localhost:24404/maixiandb';
var maixiandb = {};

maixiandb.connectdb = function(callback){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
        if(err){
            console.log("连接失败！", err);
        }else{
            console.log("连接成功！"); 
            maixiandb.db = db;
            callback();
        }
	});
}

maixiandb.deleteData = function(table, data, callback){
    var collection = maixiandb.db.collection(table);

    //删除数据
    collection.remove(data, 1, function(err, result){
    	if(err)
    	{
    		callback({status:0, info:err.tostring()});
    		return;
    	}
    	callback({status:1,info:data});
    });
};

maixiandb.findData = function(table, data, callback){
    var collection = maixiandb.db.collection(table);

    //查询数据
    collection.find(data).toArray(function(err, result){ 
        if(err)
        {
	    	callback({status:0,
	    				info:err.tostring()});
            return;
        }
	    callback({status:1,
	    		  info:result});
    });
};

maixiandb.insertData = function(table, data, callback) {
    var collection = maixiandb.db.collection(table);
 
    //插入数据
    collection.insert(data, function(err, result) { 
        if(err)
        {
	    	callback({status:0,
	    				info:err.tostring()});
            return;
        }
	    callback({status:1});
    });
};

module.exports = maixiandb;