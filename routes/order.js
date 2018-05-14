var express = require('express');
var router = express.Router();

const orders = require('../models/orders');

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

router.get('/:orderid', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    orders.findById(req.params.orderid)
    .then((order) => {
        return res.render('item',{zonglan:"/index", status:1, item:item});
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    req.body.innerImage = req.body.innerImage.split(",");
    req.body.itemDetailImage = req.body.itemDetailImage.split(",");
    itemlists.findOneAndUpdate({name:req.body.name}, {$set:req.body}, {new:true,upsert:true})
    .then((result) => {
        return res.send({status:1});
    }, (err) => next(err))
    .catch((err) => next(err));
});

/* 更新订单. */
router.post('/', function(req, res, next) {
    console.log("phy body ", req.body);
});

module.exports = router;
