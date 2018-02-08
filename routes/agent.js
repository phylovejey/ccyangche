var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');
var ObjectID = require('mongodb').ObjectID;

//代理管理
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    console.log("Get Item page ", req.body);
    var data = 
    {
        zonglan:"/admin"
    }

    return res.render('agent', data);
});

//增加代理
router.post('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

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
            return res.send(result);
        });
    }
    else if(req.body.opera === 'delete')
    {
        maixiandb.deleteData('user', {_id:ObjectID(req.body.key),identity:1}, function(result){
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

module.exports = router;
