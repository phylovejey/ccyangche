var maixiandb = require('../db/maixiandb');
var globalbanner = {};

globalbanner.nullBanner = function(){
    return {
        _id:"",
        bannername:"",
        bannerdes:"",
        bannerpic:"",
        bannerstarttime:"",
        bannerendtime:"",
        banneritems:"",
    }
}

globalbanner.packageBanner = function(input){
    var result = {banner:{},error:""};

    if(input.bannername == null || input.bannername == ""){
    	result.error = "bannername";
    	return result;
    }
    result.banner.bannername = input.bannername;
    result.banner.bannerdes = input.bannerdes != null ? input.bannerdes : "";
    if(input.bannerpic == null || input.bannerpic == ""){
    	result.error = "bannerpic";
    	return result;
    }
    result.banner.bannerpic = input.bannerpic;
    result.banner.bannerstarttime = input.bannerstarttime != null ? input.bannerstarttime : ""; 
	result.banner.bannerendtime = input.bannerendtime != null ? input.bannerendtime : "";
	if(input.banneritems == null || input.banneritems == ""){
    	result.error = "banneritems";
    	return result;
    }
    result.banner.banneritems = input.banneritems;

    return result;
};

globalbanner.findAllBanner = function(sortrule, callback){
    var collection = maixiandb.db.collection('banner');

    //查询所有Banner
    collection.find().sort(sortrule).toArray(function(err, result){ 
        if(err)
        {
            callback({status:0,
                error:err.tostring()});
            return;
        }
        callback({status:1,
            info:result});
    });
};

globalbanner.findBanner = function(data, callback){
    var collection = maixiandb.db.collection('banner');

    //查询Banner
    collection.find(data).toArray(function(err, result){ 
        if(err)
        {
            callback({status:0,
                error:err.tostring()});
            return;
        }
        console.log("globalitem.findBanner ", result);
        callback({status:1,
            info:result});
    });
};

globalbanner.updateBanner = function(id, banner, callback){
    var collection = maixiandb.db.collection('banner');

    collection.update({_id:id},{$set:banner}, function(err, result){
        if(err){
            callback({status:0,
                    error:err.tostring()});
            return;
        }
        console.log(result);
        callback({status:1,
            suc:"更新Banner成功"});
    })
}

globalbanner.insertBanner = function(banner, callback){
    var collection = maixiandb.db.collection('banner');
    //验证Banner名称
    collection.find({bannername:banner.bannername}).toArray(function(err, result){ 
        if(err){
            callback({status:0,
                error:err.tostring()});
            return;
        }
        if(result.length > 0){
            callback({status:0,
                error:"Banner名称重复"});
            return;
        }

        //插入Banner数据
        collection.insert(banner, function(err, result){ 
            if(err){
                callback({status:0,
                    error:err.tostring()});
                return;
            }
            callback({status:1,
                suc:"增加Banner成功"});
        });
    });
};

module.exports = globalbanner;