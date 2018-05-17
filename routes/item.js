var express = require('express');
var router = express.Router();

const itemlists = require('../models/itemlists');

router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    return res.render('itemnull',{zonglan:"/index"});
});

router.get('/:itemid', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    itemlists.findById(req.params.itemid)
    .then((item) => {
        item.innerImage = item.innerImage.join(",");
        item.itemDetailImage = item.itemDetailImage.join(",");
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

router.delete('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    itemlists.remove({_id:req.body._id})
    .then((result) => {
        return res.send({status:1});
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;
