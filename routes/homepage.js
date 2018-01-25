var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("GET home page.");
  res.render('homepage', { title: '首页' });
});

//登录接口
router.post('/login', function(req, res, next){
    //用户名、密码、验证码
    var username = req.body.username;
    var password = req.body.password;

    console.log("username: " + username);
    console.log("password: " + password);
    //TODO ：对用户名、密码进行校验
    //xss处理、判空

    //密码加密 md5(md5(password + '随机字符串'))
    //密码需要加密－> 可以写入JSON文件
    if(username === 'admin' && password === '123456'){
        res.cookie('user',username);
        return res.send({
            status: 1
        });
    }

    return res.send({
        status: 0,
        info: '登录失败'
    });
});

module.exports = router;
