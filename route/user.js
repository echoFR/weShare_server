const express=require('express');
const db= require('../mysql/db');
const sendEmail= require('../libs/sendEmail');
const addUser= require('../user/addUser');
const useRoute = express.Router();
const isUser= require('../user/isUser');
const checkPass= require('../libs/util');
const matchPass= require('../user/matchPass');
const getInfo_id= require('../user/getInfo_id');
const getFollow_list= require('../user/getFollow_list');
const getFans_list= require('../user/getFans_list');
const getRelation= require('../user/getRelation');
const deleteFollow= require('../user/deleteFollow');
const insertFollow= require('../user/insertFollow');
const isLogin= require('../libs/isLogin');
const common= require('../libs/common');
const modifyInfo= require('../user/modifyInfo');
const modifyPass= require('../user/modifyPass')
// 获取激活码 
useRoute.post('/code',(req,res)=>{
    // 邮箱是否合法
    const reg= /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if(!checkPass(reg,req.body.email)){
        res.send({
            error: true,
            data: '邮箱格式不正确'
        })
    }
    // 检查邮箱是否存在
    isUser(db,req.body.email,(data)=>{
        if(data.error){
            if(data.data=='数据库出错'){
                res.send({
                    error: true,
                    data: '数据库出错'
                })
            }else{
                res.send({
                    error: true,
                    data: '该邮箱已经注册过了'
                })
            }
        }else{
            // 发送邮件
            sendEmail(req.body.email,(data)=>{
                if(data.error == false){ 
                    req.session['codeInfo']= data.codeInfo
                }
                console.log(data);
                res.send(data);
            });
        }
    })
})
// 检测激活码  并且注册
useRoute.post('/checkCode',(req,res)=>{
    let date = Date.now() - req.session['codeInfo'].date;
    let md5_pass= common.md5(req.body.pass+common.MD5_SUFFIX)
    
    let inputInfo={
        email: req.session['codeInfo'].email,
        pass: md5_pass,
        code: req.body.code   
    };
    if(!req.session['codeInfo']){
        res.send({
            error: true,
            data: '尚未获取激活码，请先获取'
        })
    }
    if(inputInfo.code === req.session['codeInfo'].code && date <= 3*60*1000) {
        // 注册
        req.session['codeInfo'] = null;
        addUser(db,inputInfo.email,inputInfo.pass,(data)=>{
            res.send(data)
        })
    }else {
        if(inputInfo.code !== req.session['codeInfo'].code) {
            res.send({
                error : true,
                data : '激活码错误'
            })
        }else {
            res.send({
                error : true,
                data : '激活码已超时，请重新获取'
            })
        }
    }
})
module.exports=useRoute;

// 登录
useRoute.post('/login',(req,res)=>{
    req.secret=='wefgrthtgrfd';
    const email= req.body.email;
    const pass= req.body.pass;
    // 邮箱是否合法
    const reg= /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if(!checkPass(reg,req.body.email)){
        res.send({
            error: true,
            data: '邮箱格式不正确'
        })
    }
    // 检查邮箱是否存在
    isUser(db,email,(data)=>{
        if(data.error){
            if(data.data=='数据库出错'){
                res.send({
                    error: true,
                    data: '数据库出错'
                })
            }else{
                const passReg= /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{6,}|(?:(?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*[0-9])|(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*[0-9])(?=.*[^A-Za-z0-9])|).{8,16}$/                
                if(!checkPass(passReg,pass)){
                    res.send({
                        error: true,
                        data: '密码格式不正确'
                    })
                }
                // 密码解密
                let md5_pass= common.md5(req.body.pass+common.MD5_SUFFIX)
                // 密码是否正确
                matchPass(db,email,md5_pass,(data)=>{
                    if(data.error){res.send(data)}
                    else{
                        getInfo_id(db,data.data.user_id,(data)=>{
                            if(data.error){
                                console.log(data);
                                res.send(data.data)
                            }else{
                                // 登录成功
                                const loginTime= Date.now();
                                const info= Object.assign({},data.data.info,{login_time: loginTime})
                                // session 和cookie做身份认证
                                req.session.user_info = info;
                                res.cookie('user_info',info ,{ maxAge :1000* 60* 30, signed: true});
                                res.send({
                                    error: false,
                                    data:{
                                        user_info: info
                                    }
                                });
                            }
                        })
                    }
                })
            }
        }else{
            res.send({
                error: true,
                data: '该邮箱还没有注册过'
            })
        }
    })
})
//登出
useRoute.get('/log_out', function(req,res) {
    if(isLogin(req)){
        res.clearCookie('user_info');     //删除cookie
        req.session= null   //删除cookie
        res.send({
            error: false,
            data: '成功退出登录'
        })
    }else{
        res.send({
            error: true,
            data: '尚未登录'
        })
    }
})

useRoute.get('/getInfo_id',(req,res)=>{
    getInfo_id(db,req.query.id,(data)=>{
        res.send(data);
    })
})

useRoute.get('/getFollow_list',(req,res)=>{
    getFollow_list(db,req.query.id,(data)=>{
        res.send(data);
    })
})
useRoute.get('/getFans_list',(req,res)=>{
    getFans_list(db,req.query.id,(data)=>{
        res.send(data);
    })
})
// 获取用户间关系
useRoute.get('/get_relation',(req,res)=>{
    getRelation(db,req.query.user_id,req.query.other_id,(data)=>{
        res.send(data);
    })
})
// 取消关注
useRoute.get('/delete_follow',(req,res)=>{
    if(!isLogin){
        res.send({
            error: true,
            data: '您还没有登录，请先去登录'
        })
    }else{
        deleteFollow(db,req.query.user_id,req.query.follow_id,(data)=>{
            res.send(data);
        })
    }
})
// 添加关注
useRoute.get('/insert_follow',(req,res)=>{
    if(!isLogin){
        res.send({
            error: true,
            data: '您还没有登录，请先去登录'
        })
    }else{
        insertFollow(db,req.query.user_id,req.query.follow_id,(data)=>{
            res.send(data);
        })
    }
    
})
// 修改用户信息
useRoute.get('/modify_info',(req,res)=>{
    if(!isLogin){
        res.send({
            error: true,
            data: '您还没有登录，请先去登录'
        })
    }else{
        modifyInfo(db,req.query.user_id,req.query.type,req.query.newValue,(data)=>{
            res.send(data);
        })
    }
})
// 修改密码
useRoute.post('/modify_pass',(req,res)=>{
    if(!isLogin){
        res.send({
            error: true,
            data: '您还没有登录，请先去登录'
        })
    }else{
         modifyPass(db,req.body.email,req.body.old_pass,req.body.new_pass,(data)=>{
            if(data.error){
                res.send(data);
            }else{//修改成功 自动退出
                res.clearCookie('user_info');     //删除cookie
                req.session= null   //删除cookie
                res.send({
                    error: false,
                    data: '密码修改成功，将退出，请重新登录'
                })
            }
        })
    }
})

