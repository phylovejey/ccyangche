var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    if(req.cookies.user.identity === 1)
    {
        return res.render('adhomepage',{ title: '管理员' });
    }
    else
    {
       return res.render('error'); 
    }
});

//登录成功
router.get("/item", function(req, res, nex){
    if(!req.cookies.user){
        return res.render('homepage',{});
    }
    res.render('editItem', { title: '商品编辑' });
});

//插入数据
router.post('/item', function(req, res, next){
    console.log("插入数据！", req.body);
    maixiandb.insertData('item', req.body, function(result){
        if(result == 0)
        {
            console.log("插入失败");
        }
        return res.send(result);
    });
});

module.exports = router;
