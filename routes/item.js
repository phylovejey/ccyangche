var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');
var ObjectID = require('mongodb').ObjectID;

/* GET Item page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    console.log("Get Item page ", req.body);
    var data = 
    {
        zonglan:"/admin"
    }

    return res.render('item',data);
});

//登录成功
router.get("/item", function(req, res, nex){
    if(!req.cookies.user){
        return res.render('homepage',{});
    }
    res.render('editItem', { name:req.cookies.user.name});
});

//插入数据
router.post('/item', function(req, res, next){
    console.log("插入数据！", req.body);
    maixiandb.insertData('item', req.body, function(result){
        if(result == 0)
        {
            console.log("插入失败");
        }
        return res.send(result);
    });
});

module.exports = router;
