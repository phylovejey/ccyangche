var express = require('express');
var router = express.Router();
var globalitem = require('../global/globalitem');
var url = require('url');
var ObjectID = require('mongodb').ObjectID;

/* GET Item page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    var arg = url.parse(req.url, true).query;
    console.log("Get Item page arg ", arg);

    if(arg.id != undefined && arg.id != null){
        globalitem.findItem({_id:ObjectID(arg.id)}, function(result){
            return res.render('item',{zonglan:"/admin",item:result.info[0]});
        });
    }else{
        return res.render('item',{zonglan:"/admin",item:globalitem.nullItem()});
    }
});

//更新商品数据
router.post('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    var itemresult = globalitem.packageItem(req.body);
    console.log("商品数据 ", req.body);
    if(itemresult.error === ""){
        if(req.body._id == ""){//插入
            globalitem.insertItem(itemresult.item, function(result){
                return res.send(result);
            });
        }else{//更新
            globalitem.updateItem(ObjectID(req.body._id), itemresult.item, function(result){
                return res.send(result);
            });
        }
    }else{
        return res.send({status:0,
            error:itemresult.error});
    }
});

module.exports = router;
