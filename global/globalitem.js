var maixiandb = require('../db/maixiandb');
var ObjectID = require('mongodb').ObjectID;
var globalitem = {};

globalitem.packageItem = function(input){
    var result = {item:{},error:""};

    if(input.itemname == null || input.itemname == ""){
    	result.error = "itemname";
    	return result;
    }
    result.item.itemname = input.itemname;
    result.item.itemnamedes = input.itemnamedes != null ? input.itemnamedes : "";
    if(Number(input.itemoriginalprice) == null){
    	result.error = "itemoriginalprice";
    	return result;
    }
    result.item.itemoriginalprice = Number(input.itemoriginalprice);
   	result.item.itemcurrentprice = Number(input.itemcurrentprice) != null ?  Number(input.itemcurrentprice) : result.item.itemoriginalprice;
   	result.item.itemgroupprice = Number(input.itemgroupprice) != null ?  Number(input.itemgroupprice) : result.item.itemoriginalprice; 	
    if(input.itemthumbnailspic == null || input.itemthumbnailspic == ""){
    	result.error = "itemthumbnailspic";
    	return result;
    }
    result.item.itemthumbnailspic = input.itemthumbnailspic;
    if(input.itemlargepic1 == null || input.itemlargepic1 == ""){
    	result.error = "itemlargepic1";
    	return result;
    }
    result.item.itemlargepic1 = input.itemlargepic1;
    result.item.itemlargepic2 = input.itemlargepic2 != null ? input.itemlargepic2 : ""; 
	result.item.itemlargepic3 = input.itemlargepic3 != null ? input.itemlargepic3 : "";
	result.item.itemlargepic4 = input.itemlargepic4 != null ? input.itemlargepic4 : "";
	result.item.itemlargepic5 = input.itemlargepic5 != null ? input.itemlargepic5 : "";
	if(input.itemdetailpic1 == null || input.itemdetailpic1 == ""){
    	result.error = "itemdetailpic1";
    	return result;
    }
	result.item.itemdetailpic1 = input.itemdetailpic1;
	result.item.itemdetailpic2 = input.itemdetailpic2 != null ? input.itemdetailpic2 : "";
	result.item.itemdetailpic3 = input.itemdetailpic3 != null ? input.itemdetailpic3 : "";
	result.item.itemdetailpic4 = input.itemdetailpic4 != null ? input.itemdetailpic4 : "";
    result.item.itemdetailpic5 = input.itemdetailpic5 != null ? input.itemdetailpic5 : "";
	result.item.itembannerpic = input.itembannerpic != null ? input.itembannerpic : "";
	result.item.groupnum = Number(input.groupnum) != null ? Number(input.groupnum) : 0;
	result.item.groupstarttime = input.groupstarttime;
	result.item.sales = Number(input.sales) != null ? Number(input.sales) : 0;
	result.item.like = Number(input.like) != null ? Number(input.like) : 0;
	if(Number(input.realinventory) == null){
    	result.error = "realinventory";
    	return result;
    }
	result.item.realinventory = Number(input.realinventory);
	if(Number(input.showinventory) == null){
    	result.error = "showinventory";
    	return result;
    }
	result.item.showinventory = Number(input.showinventory);
	if(Number(input.classify) == null){
    	result.error = "classify";
    	return result;
    }
	result.item.classify = Number(input.classify);

    return result;
};

globalitem.findItem = function(data, callback){
    var collection = maixiandb.db.collection('item');

    //查询商品
    collection.find(data).toArray(function(err, result){ 
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

globalitem.insertItem = function(item, callback){
    var collection = maixiandb.db.collection('item');
    //验证商品名称
    collection.find({itemname:item.itemname}).toArray(function(err, result){ 
        if(err){
            callback({status:0,
                error:err.tostring()});
            return;
        }
        if(result.length > 0){
            callback({status:0,
                error:"商品名称重复"});
            return;
        }

        //插入商品数据
        collection.insert(item, function(err, result){ 
            if(err){
                callback({status:0,
                    error:err.tostring()});
                return;
            }
            callback({status:1});
        });
    });
};

module.exports = globalitem;