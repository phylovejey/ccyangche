var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');
var ObjectID = require('mongodb').ObjectID;

//订单管理
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    console.log("Get Order page ", req.body);
    var data = 
    {
        zonglan:"/admin"
    }

    return res.render('order', data);
});

//增加代理
router.post('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    console.log("Get Order page ", req.body);
});

module.exports = router;
