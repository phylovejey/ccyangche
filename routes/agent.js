var express = require('express');
var router = express.Router();

const agents = require('../models/agents');

//代理管理
router.get('/', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        res.render('login', { title: '买鲜后台管理系统' });
    }

    var data = 
    {
        zonglan:"/index"
    }

    return res.render('agentnull', data);
});

router.get('/:agentid', function(req, res, next) {
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    agents.findById(req.params.agentid)
    .then((agent) => {
        agent.community = agent.community.join(",");
        return res.render('agent',{zonglan:"/index", status:1, agent:agent});
    }, (err) => next(err))
    .catch((err) => next(err));
});

//增加代理
router.post('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    req.body.community = req.body.community.split(",");
    agents.findOneAndUpdate({phonenumber:req.body.phonenumber}, req.body, {new:true,upsert:true})
    .then((result) => {
        return res.send({status:1});
    }, (err) => next(err))
    .catch((err) => next(err));
});

//删除代理
router.delete('/', function(req, res, next){
    if(!req.cookies.user || req.cookies.user.identity != 0){
        return res.render('login', { title: '买鲜后台管理系统' });
    }

    agents.remove({_id:req.body._id})
    .then((result) => {
        return res.send({status:1});
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;
