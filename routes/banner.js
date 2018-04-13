var express = require('express');
var router = express.Router();

/* GET banner page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    return res.render('banner',{zonglan:"/index"});
});

//更新banner数据
router.post('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }
    console.log("banner数据 ", req.body);
});

module.exports = router;
