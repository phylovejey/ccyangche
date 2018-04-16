var express = require('express');
var router = express.Router();

const banners = require('../models/banners');

/* GET banner page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    return res.render('bannernull',{zonglan:"/index"});
});

router.get('/:bannerid', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    banners.findById(req.params.bannerid)
    .then((banner) => {
        return res.render('banner',{zonglan:"/index", status:1, banner:banner});
    }, (err) => next(err))
    .catch((err) => next(err));
});

//更新banner数据
router.post('/', function(req, res, next){
    console.log("banner数据 ", req.body);
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    banners.findOneAndUpdate({bannername:req.body.bannername}, req.body, {new:true,upsert:true})
    .then((result) => {
        return res.send({status:1});
    }, (err) => next(err))
    .catch((err) => next(err));
});

//删除代理
router.delete('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    banners.remove({_id:req.body._id})
    .then((result) => {
        return res.send({status:1});
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = router;
