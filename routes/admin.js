var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    return res.render('adhomepage',{ name:req.cookies.user.name});
});

//代理管理
router.get('/intro', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    return res.render('editIntro',{ name:req.cookies.user.name});
});

//增加代理
router.post('/intro', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }
    
    console.log("phy ", req.body);
    if(req.body.opera === 'add')
    {
        var introducer = 0;
        if(req.body.intro_phonenumber !== "")
        {
            maixiandb.findData('user', {phonenumber:req.body.intro_phonenumber}, function(result){
                if(result.status == 1 && result.info.length > 0)
                {
                    introducer = result.info[0].name;
                }
            });
        }
        var agent = {
            name:req.body.name,
            password:req.body.password,
            authority:1,
            des:"代理商",
            introducer:introducer,
            identity:1,
            realname:req.body.realname,
            phonenumber:req.body.phonenumber,
            location:req.body.location
        }

        maixiandb.insertData('user', agent, function(result){
            if(result.status == 0)
            {
                console.log("增加代理失败");
            }
            return res.send(result);     
        });
    }
    else if(req.body.opera === 'query')
    {
        maixiandb.findData('user', {phonenumber:req.body.query,identity:1}, function(result){
            console.log("phy query ", result);
            return res.send(result);
        });
    }
    else if(req.body.opera === 'delete')
    {
        console.log("phy del ", parseInt(req.body.key, 16));
        maixiandb.deleteData('user', {_id:parseInt(req.body.key, 16),identity:1}, function(result){
            if(result.status == 0)
            {
                console.log("删除代理失败");
            }
            return res.send(result);     
        });
    }
    else if(req.body.opera === 'modify')
    {

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
