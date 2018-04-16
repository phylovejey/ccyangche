var express = require('express');
var router = express.Router();

const itemlists = require('../models/itemlists');
const agents = require('../models/agents');
const banners = require('../models/banners');

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
    console.log("phy search body ", req.body);
    
    var searchkey = req.body.value;
    var regex = new RegExp(".*" + searchkey + ".*","i"); //
    if(req.body.target === '1') {
        itemlists.find({name:regex})
        .then((items) => {
            console.log("phy results ", items);
            res.send({status:1, results:items, target:1});
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else if(req.body.target === '2') {

    }
    else if(req.body.target === '3') {
    	agents.find({name:regex})
        .then((agents) => {
            console.log("phy results ", agents);
            res.send({status:1, results:agents, target:3});
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else if(req.body.target === '4') {
        banners.find({bannername:regex})
        .then((banner) => {
            console.log("phy results ", banner);
            res.send({status:1, results:banner, target:4});
        }, (err) => next(err))
        .catch((err) => next(err));
    }
});

module.exports = router;
