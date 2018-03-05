var express = require('express');
var router = express.Router();
var url = require('url');
var globalitem = require('../global/globalitem');
var globalredis = require('../global/globalredis');
var schedule = require("node-schedule"); 

var wxitem = {};
var rule = schedule.RecurrenceRule();
rule.hour = [0,6,12,18];
rule.minute = 0;
 
var j = schedule.scheduleJob(rule, function(){
　　globalitem.findAllItem({"sales":-1}, function(result){
        generateitempage();
    });
});

function generateitempage(){
    globalitem.findAllItem({"sales":-1}, function(result){
        if(result.status == 0){
            console.log("phy findAllItem error ", result.error);
        }else{
            console.log("globalitem.findAllItem ", result.info);
            wxitem = result.info;   
        }
    });    
}

/* GET wxitem page. */
router.get('/', function(req, res, next) {
    var arg = url.parse(req.url, true).query;
    console.log("Get wxitem arg ", arg);

    if(arg.start != null && arg.end != null){
        if(wxitem.length <= end){
            arg.end = wxitem.length - 1;
        }
        res.send({status:1, item:wxitem.slice(arg.start, arg.end), end:arg.end});
    }else{
        res.send({status:0, error:"参数错误"});
    }
});

generateitempage();

module.exports = router;
