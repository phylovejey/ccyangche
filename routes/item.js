var express = require('express');
var router = express.Router();
var globalitem = require('../global/globalitem');

/* GET Item page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    console.log("Get Item page ", req.body);
    var data = 
    {
        zonglan:"/admin"
    }

    return res.render('item',data);
});

//插入数据
router.post('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    var itemresult = globalitem.packageItem(req.body);
    if(itemresult.error === ""){
        globalitem.insertItem(itemresult.item, function(result){
            return res.send(result);
        });
    }else{
        return res.send({status:0,
            error:itemresult.error});
    }
});

module.exports = router;
