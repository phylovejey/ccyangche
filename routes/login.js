var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');
var https = require('https');
var request = require("request")
var crypto = require('crypto');
var globalredis = require('../global/globalredis');

const mxappid = "wx1de05d1121007dcf";
const mxsecret = "852ed1bc62f5abbdc31f47a2c8a38612";

//const mxappid = "wxf40b8a310ac448ee";
//const mxsecret = "857185500a63ee246163486da3ca6608";

/* GET Login page. */
router.get('/', function(req, res, next) {
    console.log("GET Login Page.");
    res.render('login', { title: '买鲜后台管理系统' });
});

//"https://api.weixin.qq.com/sns/jscode2session?appid=$%s&secret=$%s&js_code=$%s&grant_type=authorization_code";
router.post('/wxlogin', function(req, res, next){
    var mxres = res;
    var code = req.body.code;

    console.log("phy wxlogin code", code);

    request.get({
        uri:"https://api.weixin.qq.com/sns/jscode2session",
        json:true,
        qs:{
            grant_type: "authorization_code",
            appid: mxappid,
            secret: mxsecret,
            js_code: code           
        }
    }, function(err, res, data){
        if(res.statusCode === 200){
            if(data.openid != null){
                var token = crypto.randomBytes(16).toString("hex");
                globalredis.setdata(token, {openid:data.openid,session_key:data.session_key});
                mxres.send({status:1, sessionid:token});
            }else{
                mxres.send({status:0, error:data});
            }
        }else{
            console.log("phy authorization_code error ", err);
            mxres.send({status:0, error:err.toString()});
        }

    });
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