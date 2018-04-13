var express = require('express');
var router = express.Router();

/* GET Search page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    var data = 
    {
        zonglan:"/index"
    }

    return res.render('search',data);
});

//搜索数据
router.post('/', function(req, res, next){
    if(req.body.target === '1') {
    }
    else if(req.body.target === '2') {

    }
    else if(req.body.target === '3') {
    	
    }
    else if(req.body.target === '4') {
    }
});

module.exports = router;
