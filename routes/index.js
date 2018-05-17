var express = require('express');
var router = express.Router();
var commonfunc = require('../global/commonfunc');

const orders = require('../models/orders');
const users = require('../models/users');

/* GET Index page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    var orderscount = totalrevenue = newuser = 0;

    var todayzero = commonfunc.getTodayZero();
    var todayzerotimestamp = new Date(todayzero).getTime()/1000;

    orders.find({status:{$gt: 0}, order_timestamp:{$gte:todayzerotimestamp}})
    .then((orders) => {
    	orderscount = orders.length;
    	orders.forEach((order) => {
    	 	totalrevenue = totalrevenue + order.total_fee;
  		});
    	totalrevenue = totalrevenue/100;
    }, (err) => next(err))
    .then(() => {
    	return users.count({createdAt:{$gt:todayzero}});
    }, (err) => next(err))
    .then((count) => {
    	newuser = count;
    	return res.render('index',{zonglan:"/index", orderscount:orderscount, totalrevenue:totalrevenue, newuser:newuser});
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;
