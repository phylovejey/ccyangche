var express = require('express');
var router = express.Router();
var url = require('url');
 
/* GET banner page. */
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    var data = 
    {
        zonglan:"/admin"
    }

    return res.render('banner',data);
});

module.exports = router;
