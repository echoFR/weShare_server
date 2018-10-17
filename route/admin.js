const express=require('express');
const db= require('../mysql/db');

const adminRoute = express.Router();
adminRoute.use('/',(req,res)=>{
    console.log(req.body);
    db.query(`SELECT * FROM user_info`,(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).end('database wrong');
        }else{
            console.log('成功');
            res.send(data);
        }
    })
})

module.exports=adminRoute;
