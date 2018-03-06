var express = require('express');
var router = express.Router();
var globalbanner = require('../global/globalbanner');
var url = require('url');
var ObjectID = require('mongodb').ObjectID;

/* GET banner page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    var arg = url.parse(req.url, true).query;
    console.log("Get banner page arg ", arg);

    if(arg.id != undefined && arg.id != null){
        globalbanner.findBanner({_id:ObjectID(arg.id)}, function(result){
            return res.render('banner',{zonglan:"/admin",banner:result.info[0]});
        });
    }else{
        return res.render('banner',{zonglan:"/admin",banner:globalbanner.nullBanner()});
    }
});

//更新banner数据
router.post('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }
    console.log("banner数据 ", req.body);

    var bannerresult = globalbanner.packageBanner(req.body);
    if(bannerresult.error === ""){
        if(req.body._id == ""){//插入
            globalbanner.insertBanner(bannerresult.banner, function(result){
                return res.send(result);
            });
        }else{//更新
            globalbanner.updateBanner(ObjectID(req.body._id), bannerresult.banner, function(result){
                return res.send(result);
            });
        }
    }else{
        return res.send({status:0,
            error:bannerresult.error});
    }
});

module.exports = router;
