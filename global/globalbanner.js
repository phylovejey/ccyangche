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
        banneritemids:"",
        banneritemnames:"",
    }
}

globalbanner.packageBanner = function(input){
    var result = {banner:{},error:""};

    if(input.bannername == null || input.bannername == ""){
    	result.error = "banner名称不能为空";
    	return result;
    }
    result.banner.bannername = input.bannername;
    result.banner.bannerdes = input.bannerdes != null ? input.bannerdes : "";
    if(input.bannerpic == null || input.bannerpic == ""){
    	result.error = "banner图片不能为空";
    	return result;
    }
    result.banner.bannerpic = input.bannerpic;
    result.banner.bannerstarttime = input.bannerstarttime != null ? input.bannerstarttime : ""; 
	result.banner.bannerendtime = input.bannerendtime != null ? input.bannerendtime : "";
	if(input.banneritemids == null || input.banneritemids == ""){
    	result.error = "商品列表不能为空";
    	return result;
    }
    result.banner.banneritemids = input.banneritemids;
    result.banner.banneritemnames = input.banneritemnames != null ? input.banneritemnames : "";
    
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