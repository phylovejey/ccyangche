var express = require('express');
var router = express.Router();
var url = require('url');
var globalitem = require('../global/globalitem');
var globalredis = require('../global/globalredis'); 

var wxitem = new Array();

router.generateitempage = function(){
    globalitem.findAllItem({"sales":-1}, function(result){
        if(result.status == 0){
            console.log("phy findAllItem error ", result.error);
        }else{
            wxitem = result.info;
        }
    });    
}

router.startgenerateitempage = function(){
    var interval = setInterval(router.generateitempage, 1000*60*60*6);
}

/* GET wxitem page. */
router.get('/', function(req, res, next) {
    var sessionid = req.header("sessionid")
    globalredis.getdata(sessionid, function(object){
        if(object != null){
            var arg = url.parse(req.url, true).query;
            console.log("Get wxitem arg ", arg);

            if(arg.start != null && arg.end != null){
                if(wxitem.length < arg.end){
                    arg.end = wxitem.length;
                }
                res.send({status:1, item:wxitem.slice(arg.start, arg.end), end:wxitem.length});
            }else{
                res.send({status:0, error:"参数错误"});
            }     
        }else{
            res.send({status:0, error:"用户未登录"});
        }
    });
});

module.exports = router;
