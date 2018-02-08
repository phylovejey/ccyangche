var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');
var ObjectID = require('mongodb').ObjectID;

/* GET Index page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    console.log("Get Index page ", req.body);
    var data = 
    {
        zonglan:"/admin"
    }

    return res.render('index',data);
});

module.exports = router;
