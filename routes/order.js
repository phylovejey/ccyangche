var express = require('express');
var router = express.Router();

//订单管理
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    console.log("Get Order page ", req.body);
    var data = 
    {
        zonglan:"/index"
    }

    return res.render('order', data);
});

/* 更新订单. */
router.post('/', function(req, res, next) {
    console.log("phy body ", req.body);
});

module.exports = router;
