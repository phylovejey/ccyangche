var express = require('express');
var router = express.Router();
var globalitem = require('../global/globalitem');

/* GET Search page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    var data = 
    {
        zonglan:"/admin"
    }

    return res.render('search',data);
});

//搜索数据
router.post('/', function(req, res, next){
    console.log("Get Search body ", req.body);
    if(req.body.target === '1'){
        if(req.body.key === "itemname"){
            globalitem.findItem({"itemname":{$regex:req.body.value}}, function(result){
                return res.send({target:1,result:result});
            });
        }else if(req.body.key === "classify"){
            globalitem.findItem({"classify":{$regex:req.body.value}}, function(result){
                return res.send({target:1,result:result});
            });
        }
    }
    else if(req.body.target === '2'){

    }
    else if(req.body.target === '3'){
    	
    }
});

module.exports = router;
