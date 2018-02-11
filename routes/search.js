var express = require('express');
var router = express.Router();
var globalitem = require('../global/globalitem');

/* GET Search page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    console.log("Get Search page ", req.body);
    var data = 
    {
        zonglan:"/admin"
    }

    return res.render('search',data);
});

//搜索数据
router.post('/', function(req, res, next){
	if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    console.log("Get Search body ", req.body);
    if(req.body.target === "item"){
        res.render('search',{zonglan:"/admin"});
    	/*globalitem.findItem({itemname:req.body.key}, function(result){
            return res.render('search',{zonglan:"/admin"});
    	});*/
    }
    else if(req.body.target === "agent"){

    }
    else if(req.body.target === "oder"){
    	
    }
});

module.exports = router;
