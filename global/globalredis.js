var redis = require("redis");
var client = redis.createClient();
var globalredis = {};

//写入JavaScript(JSON)对象
globalredis.setdata = function(key, value, callback){
    client.hmset(key, value, function(err) {
        console.log(err);
    })
}

//读取JavaScript(JSON)对象
globalredis.getdata = function(key, callback){
    client.get(key, function(err, object) {
        if(err){
            console.log(err);
        }else{
            callback(object);
        }
    })
}

module.exports = globalredis;