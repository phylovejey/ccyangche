var express = require('express');
var router = express.Router();
var maixiandb = require('../db/maixiandb');
var globalitem = require('../global/globalitem');
var ObjectID = require('mongodb').ObjectID;

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
    console.log("插入数据！", req.body);
    var itemresult = globalitem.packageItem(req.body);
    if(itemresult.error === ""){
        //maixiandb.insertData('item', itemresult.item, function(result){
            if(result == 0)
            {
                console.log("插入失败");
            }
            //return res.send(result);
        });
    }
    else{
        console.log("phy 插入数据错误 ", itemresult.error);
        return res.send({error:itemresult.error});
    }
});

module.exports = router;
