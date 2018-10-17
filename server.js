const express= require('express');
const static= require('express-static');
const cookieParser= require('cookie-parser');
const cookieSession= require('cookie-session');
const multer= require('multer');
const bodyParser= require('body-parser');
const expressRoute= require('express-route');
const server= express();
// 路由
const adminRoute= require('./route/admin');
const groupRoute= require('./route/group');
const userRoute= require('./route/user');

// 监听
server.listen(9999);
// 跨域处理
server.all('*', function(req, res, next) {
    //将外源设为指定的域
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8"); 
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');   
    //将Access-Control-Allow-Credentials设为true  允许携带cookie
    res.header('Access-Control-Allow-Credentials', true); 
    next();
});

// body-parser     post数据
server.use(bodyParser.urlencoded({extended: false}));

// multer
server.use(multer({dest: './static/upload'}).any());

// cookie session
const arr=[];
for(let i=0;i<10000;i++){
    arr.push('sig_'+Math.random());
}
server.use(cookieParser('wefgrthtgrfd'));
server.use(cookieSession({
    name: 'sess',
    keys: arr,
    maxAge: 1000*60*30,
}));

// 路由配置
server.use('/admin',adminRoute);
server.use('/user',userRoute);
server.use('/group',groupRoute);

// 静态文件
server.use(static('./static/'));


