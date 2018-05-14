var express = require('express');
var router = express.Router();

const itemlists = require('../models/itemlists');
const orders = require('../models/orders');
const agents = require('../models/agents');
const banners = require('../models/banners');
const users = require('../models/users');

/* GET Search page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    var data = 
    {
        zonglan:"/index"
    }

    return res.render('search',data);
});

//搜索数据
router.post('/', function(req, res, next){
    var searchkey = req.body.value;
    var regex = new RegExp(".*" + searchkey + ".*","i"); //
    if(req.body.target === '1') {
        itemlists.find({name:regex})
        .then((items) => {
            res.send({status:1, results:items, target:1});
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else if(req.body.target === '2') {
        var localData = searchkey + " 00:00:00";
        var oneday = 24 * 60 * 60;
        var t1 = new Date(localData).getTime()/1000;
        var t2 = t1 + oneday;
        orders.find({status:{$gt: 0}, order_timestamp:{$gte:t1, $lt:t2}}).populate('purchaseitem').populate('consumer')
        .then((orders) => {
            res.send({status:1, results:orders, target:2});
        })
    }
    else if(req.body.target === '3') {
    	agents.find({name:regex})
        .then((agents) => {
            res.send({status:1, results:agents, target:3});
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else if(req.body.target === '4') {
        banners.find({bannername:regex})
        .then((banner) => {
            res.send({status:1, results:banner, target:4});
        }, (err) => next(err))
        .catch((err) => next(err));
    }
});

module.exports = router;
