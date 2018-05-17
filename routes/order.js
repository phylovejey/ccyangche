var express = require('express');
var router = express.Router();

const orders = require('../models/orders');
const itemlists = require('../models/itemlists');
const users = require('../models/users');

//订单管理
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

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

    orders.findById(req.params.orderid).populate('purchaseitem').populate('consumer')
    .then((order) => {
        return res.render('orderdetail',{zonglan:"/index", status:1, order:order});
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }
    req.body.status = parseInt(req.body.status);

    orders.findOneAndUpdate({order_no:req.body.order_no}, {$set:req.body}, {new:true}).populate('purchaseitem').populate('consumer')
    .then((result) => {
        return res.render('orderdetail',{zonglan:"/index", status:1, order:result});
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;
