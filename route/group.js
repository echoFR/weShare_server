const express= require('express');
const db= require('../mysql/db');
const getGroupTag= require('../group/getGroupTag');
const getGroupList= require('../group/getGroupList');
const getGroupInfo= require('../group/getGroupInfo');
const userGroup= require('../group/userGroup');
const groupRoute= express.Router();
const insertFollow_group= require('../group/insertFollow_group');
const deleteFollow_group= require('../group/deleteFollow_group');

groupRoute.use('/tag',(req,res)=>{
    getGroupTag(db,(data)=>{
        res.send(data);
    })
})
groupRoute.use('/list',(req,res)=>{
    const id= req.query.id;
    getGroupList(db,id,(data)=>{
        res.send(data);
    })
})
groupRoute.use('/info',(req,res)=>{
    const id= req.query.id;
    getGroupInfo(db,id,(data)=>{
        res.send(data);
    })
})
//用户圈子关系
groupRoute.get('/user_group',(req,res)=>{
    userGroup(db,req.query.user_id,req.query.group_id,(data)=>{
        res.send(data);
    })
})
// 取消关注
groupRoute.get('/delete_follow_group',(req,res)=>{
    deleteFollow_group(db,req.query.user_id,req.query.group_id,(data)=>{
        res.send(data);
    })
})
// 添加关注
groupRoute.get('/insert_follow_group',(req,res)=>{
    insertFollow_group(db,req.query.user_id,req.query.group_id,(data)=>{
        res.send(data);
    })
})
module.exports= groupRoute;
