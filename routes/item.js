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
        return res.render('item',{zonglan:"/admin"});
    }
});

//插入数据
router.post('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    var itemresult = globalitem.packageItem(req.body);
    if(itemresult.error === ""){
        globalitem.insertItem(itemresult.item, function(result){
            return res.send(result);
        });
    }else{
        return res.send({status:0,
            error:itemresult.error});
    }
});

module.exports = router;
