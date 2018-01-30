var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("GET home page.");
    res.render('login', { title: '买鲜后台管理系统' });
});

//登录接口
router.post('/login', function(req, res, next){
    //用户名、密码
    var username = req.body.username;
    var password = req.body.password;

    maixiandb.findData('user', {name:username}, function(result){
        if(result.status == 0)
        {
            console.log("查询失败: ", result.info);
        }
        else
        {
            var user = result.info;
            if(user.length == 0)
            {
                console.log("登录失败: 用户名不存在");
                result.status = 0;
                result.errortype = 0;
                result.info = "用户名不存在"; 
            }
            else
            {
                if(user[0].password !== password)
                {
                    console.log("登录失败: 密码错误");
                    result.status = 0;
                    result.errortype = 1;
                    result.info = "密码错误";   
                }
                else
                {
                    res.cookie('user',user[0]);
                    result.info = "登录成功";
                }
            }
        }
        return res.send(result);
    });
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
