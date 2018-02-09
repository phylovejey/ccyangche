var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');

/* GET Login page. */
router.get('/', function(req, res, next) {
    console.log("GET Login Page.");
    res.render('login', { title: '买鲜后台管理系统' });
});

//登录接口
router.post('/login', function(req, res, next){
    //用户名、密码
    var username = req.body.username;
    var password = req.body.password;

    console.log("phy login ", req.body);
    
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
                    var data = 
                    {
                        zonglan:"/admin"
                    }
                    return res.render('index',data);
                }
            }
        }
        return res.send(result);
    });
});

module.exports = router;