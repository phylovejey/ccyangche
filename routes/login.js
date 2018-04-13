var express = require('express');
var router = express.Router();

const admins = require('../models/admins');

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

    admins.findOne({username:username})
    .then((user) => {
        if(user == null) {
            res.send({status:0, error:"用户名不存在"});
        }
        else if(user.password !== password) {
            res.send({status:1, error:"密码错误"});
        }
        else {
            res.cookie('user',user);
            var data = 
            {
                zonglan:"/index"
            }
            return res.render('index',data);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = router;