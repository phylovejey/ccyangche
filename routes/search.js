var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');
var ObjectID = require('mongodb').ObjectID;

/* GET Search page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    console.log("Get Search page ", req.body);
    var data = 
    {
        zonglan:"/admin"
    }

    return res.render('search',data);
});

module.exports = router;
